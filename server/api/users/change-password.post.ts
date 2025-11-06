import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import { changePasswordValidationSchema } from "../../../utils/validation";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  // Get request body
  const { currentPassword, newPassword, confirmPassword } = await readBody(
    event,
  );
  const prisma = usePrisma();

  // Get authorization header
  const authHeader = getHeader(event, "authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized",
    });
  }

  const token = authHeader.substring(7);
  let decodedToken;

  try {
    decodedToken = jwt.verify(
      token,
      config.jwtSecret || "your_jwt_secret",
    ) as any;
  } catch {
    throw createError({
      statusCode: 401,
      message: "Invalid token",
    });
  }

  // Validate input using Joi schema
  const { error } = changePasswordValidationSchema.validate({
    currentPassword,
    newPassword,
    confirmPassword,
  }, { abortEarly: false });

  if (error) {
    throw createError({
      statusCode: 400,
      message: "Validation failed",
      data: error.details,
    });
  }

  try {
    // Find user by ID from token
    const user = await prisma.user.findUnique({
      where: { id: decodedToken.id },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
      },
    });

    if (!user) {
      throw createError({
        statusCode: 404,
        message: "User not found",
      });
    }

    // Verify current password
    const currentPasswordMatch = await argon2.verify(
      user.password,
      currentPassword,
    );
    if (!currentPasswordMatch) {
      throw createError({
        statusCode: 400,
        message: "Current password is incorrect",
        data: [{
          path: ["currentPassword"],
          message: "Current password is incorrect",
        }],
      });
    }

    // Check if new password is different from current password
    const samePassword = await argon2.verify(user.password, newPassword);
    if (samePassword) {
      throw createError({
        statusCode: 400,
        message: "New password must be different from current password",
        data: [{
          path: ["newPassword"],
          message: "New password must be different from current password",
        }],
      });
    }

    // Hash new password
    const hashedNewPassword = await argon2.hash(newPassword);

    // Update user's password
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedNewPassword },
    });

    // Return success message
    return {
      success: true,
      message: "Password changed successfully",
    };
  } catch (error: any) {
    console.error("Change password error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
      data: error.data || null,
    });
  }
});
