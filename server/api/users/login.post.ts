import * as argon2 from "argon2";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  // Get request body
  const { email, password } = await readBody(event);
  const prisma = usePrisma();

  // Validate input
  if (!email || !password || password.length < 6) {
    throw createError({
      statusCode: 400,
      message: "Invalid email or password format",
    });
  }

  try {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        rememberToken: true,
      },
    });

    if (!user) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized",
      });
    }

    // Verify password
    const match = await argon2.verify(user.password, password);
    if (!match) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized",
      });
    }

    // Create user object without sensitive data
    const userObj = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    // Sign JWT token
    const token = jwt.sign(
      userObj,
      useRuntimeConfig().jwtSecret || "your_jwt_secret",
    );

    // Return user data and token
    return {
      ...userObj,
      token,
    };
  } catch (error: any) {
    console.error("Login error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
  }
});
