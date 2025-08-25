import { promises as fs } from "fs";
import path from "path";
import juice from "juice";
import { parse } from "@vue/compiler-sfc";

// Paths
const emailsDir = path.resolve("app/pages/emails");
const componentsDir = path.resolve("app/pages/emails/components");
const outDir = path.resolve("server/assets/emails");

// Define templates with their placeholder props
const templates = [
  {
    name: "contact-email",
    file: "contact-email.vue",
    props: {
      name: "{{name}}",
      email: "{{email}}",
      phone: "{{phone}}",
      message: "{{message}}",
      year: "{{year}}",
    },
  },
  {
    name: "contact-thank-you-email",
    file: "contact-thank-you-email.vue",
    props: {
      name: "{{name}}",
      year: "{{year}}",
    },
  },
];

// Cache for component content
const componentCache = new Map<string, { html: string; css: string }>();

async function loadComponent(
  componentName: string,
): Promise<{ html: string; css: string }> {
  if (componentCache.has(componentName)) {
    return componentCache.get(componentName)!;
  }

  const componentFile = `${componentName}.vue`;
  const componentPath = path.join(componentsDir, componentFile);

  try {
    const source = await fs.readFile(componentPath, "utf-8");
    const { descriptor } = parse(source, { filename: componentPath });

    let html = descriptor.template?.content || "";
    let css = "";

    if (descriptor.styles) {
      css = descriptor.styles.map((style) => style.content).join("\n");
    }

    // Clean up template (remove whitespace-only content)
    html = html.trim();

    const result = { html, css };
    componentCache.set(componentName, result);
    return result;
  } catch (error) {
    console.warn(`Could not load component ${componentName}:`, error);
    return { html: `<!-- ${componentName} not found -->`, css: "" };
  }
}

async function processTemplate(
  html: string,
  props: Record<string, string | undefined>,
): Promise<{ html: string; css: string }> {
  let processedHtml = html;
  let allCss = "";

  // Replace component tags with their content
  const componentMatches = html.match(/<([A-Z][a-zA-Z]*)[^>]*\/?>/g);
  if (componentMatches) {
    for (const match of componentMatches) {
      const componentName = match.match(/<([A-Z][a-zA-Z]*)/)?.[1];
      if (componentName) {
        const { html: componentHtml, css: componentCss } = await loadComponent(
          componentName,
        );

        // Handle self-closing tags and regular tags
        const selfClosingRegex = new RegExp(`<${componentName}[^>]*\\/>`, "g");
        const regularTagRegex = new RegExp(
          `<${componentName}[^>]*>.*?<\\/${componentName}>`,
          "gs",
        );

        processedHtml = processedHtml.replace(selfClosingRegex, componentHtml);
        processedHtml = processedHtml.replace(regularTagRegex, componentHtml);

        allCss += componentCss + "\n";
      }
    }
  }

  // Replace Vue template syntax with placeholder values
  Object.entries(props).forEach(([key, value]) => {
    if (value !== undefined) {
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g");
      processedHtml = processedHtml.replace(regex, value);
    }
  });

  // Remove Vue-specific attributes and syntax
  processedHtml = processedHtml.replace(/\s+:[a-zA-Z-]+="[^"]*"/g, ""); // Remove :prop bindings
  processedHtml = processedHtml.replace(/\s+@[a-zA-Z-]+="[^"]*"/g, ""); // Remove @event handlers
  processedHtml = processedHtml.replace(/\s+v-[a-zA-Z-]+="[^"]*"/g, ""); // Remove v-directives

  return { html: processedHtml, css: allCss };
}

async function buildEmails() {
  // Ensure output directory exists
  await fs.mkdir(outDir, { recursive: true });

  for (const { name, file, props } of templates) {
    try {
      const filePath = path.join(emailsDir, file);

      // Read and parse the Vue SFC
      const source = await fs.readFile(filePath, "utf-8");
      const { descriptor } = parse(source, { filename: filePath });

      if (!descriptor.template) {
        console.warn(`No template found in ${file}`);
        continue;
      }

      // Process template and components
      const { html: processedHtml, css: componentCss } = await processTemplate(
        descriptor.template.content,
        props,
      );

      // Extract main component styles
      let mainCss = "";
      if (descriptor.styles) {
        mainCss = descriptor.styles.map((style) => style.content).join("\n");
      }

      // Combine all CSS
      const allCss = mainCss + "\n" + componentCss;

      // Wrap in basic HTML structure and include styles
      const fullHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>${allCss}</style>
</head>
<body>
  ${processedHtml}
</body>
</html>`;

      // Inline CSS using juice
      const inlined = juice(fullHtml);

      // Save output
      const outPath = path.join(outDir, `${name}.html`);
      await fs.writeFile(outPath, inlined, "utf8");

      console.log(`✅ Built ${name}.html`);
    } catch (error) {
      console.error(`❌ Failed to build ${name}:`, error);
    }
  }
}

buildEmails().catch((err) => {
  console.error("Email build failed:", err);
  process.exit(1);
});
