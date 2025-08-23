import csv from "csv-parser";
import { Readable } from "stream";
import formidable from "formidable";
import { parse } from "date-fns";
import { promises as fs } from "fs";
import { verifyAuth } from "../../utils/auth";

export default defineEventHandler(async (event) => {
  // Verify authentication first
  const user = await verifyAuth(event);
  const prisma = usePrisma();
  // Configure formidable
  const form = formidable({
    multiples: false,
    keepExtensions: true,
  });

  // Parse the form data
  const { files } = await new Promise<{ files: formidable.Files }>(
    (resolve, reject) => {
      form.parse(event.node.req, (err, _, files) => {
        if (err) reject(err);
        resolve({ files });
      });
    },
  );

  const file = files.file?.[0]; // Get the first file from the files object

  if (!file) {
    throw createError({
      statusCode: 400,
      message: "No file uploaded",
    });
  }

  const results: string[] = [];

  try {
    // Read file and create readable stream
    const fileContent = await fs.readFile(file.filepath);
    const parser = Readable.from(fileContent).pipe(csv());

    for await (const row of parser) {
      const startsAt = parse(row.starts_at, "yyyy-MM-dd HH:mm:ss", new Date());
      const endsAt = parse(row.ends_at, "yyyy-MM-dd HH:mm:ss", new Date());

      // Check for existing event
      const existing = await prisma.event.findFirst({
        where: {
          AND: [{ slug: row.slug }, { startsAt }],
        },
      });

      const eventData = {
        name: row.name,
        slug: row.slug,
        startsAt,
        endsAt,
        description: row.description || null,
        isFeatured: row.is_featured === "1",
        isHasEndsAt: row.is_has_ends_at === "1",
        isAllDay: row.is_all_day === "1",
        isActive: row.is_active === "1",
        hauntedBy: row.haunted_by || null,
      };

      if (existing) {
        // Update existing event
        await prisma.event.update({
          where: { id: existing.id },
          data: eventData,
        });
        results.push(`Updated ${row.name} @ ${row.starts_at}`);
      } else {
        // Create new event
        await prisma.event.create({
          data: eventData,
        });
        results.push(`Created ${row.name} @ ${row.starts_at}`);
      }
    }

    return {
      message: `Imported ${results.length} events`,
      results,
      importedBy: user.email,
    };
  } catch (error) {
    console.error("Import error:", error);
    throw createError({
      statusCode: 500,
      message: "Error processing CSV file",
    });
  } finally {
    // Clean up the temporary file
    await fs.unlink(file.filepath).catch(console.error);
  }
});
