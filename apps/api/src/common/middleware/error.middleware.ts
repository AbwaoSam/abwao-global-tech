import { Request, Response, NextFunction } from "express";
import { Prisma } from "../../generated/prisma/client";

export const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error("API Error:", error);

  // Prisma unique constraint violation
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    return res.status(409).json({
      success: false,
      message: "A record with this information already exists",
    });
  }

  // Prisma record not found
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2025"
  ) {
    return res.status(404).json({
      success: false,
      message: "Requested resource was not found",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};