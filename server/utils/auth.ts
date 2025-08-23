import jwt from "jsonwebtoken";
import type { H3Event } from "h3";

export interface AuthenticatedUser {
  id: string;
  email: string;
  name: string;
}

export async function verifyAuth(event: H3Event): Promise<AuthenticatedUser> {
  const authHeader = getHeader(event, "authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
      message: "Missing or invalid authorization header",
    });
  }

  const token = authHeader.substring(7); // Remove 'Bearer ' prefix

  try {
    const config = useRuntimeConfig();
    const decoded = jwt.verify(token, config.jwtSecret) as AuthenticatedUser;
    return decoded;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
      message: "Invalid or expired token",
    });
  }
}
