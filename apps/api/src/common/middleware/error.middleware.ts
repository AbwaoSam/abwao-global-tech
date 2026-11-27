import { Request, Response, NextFunction } from "express";
import { Prisma } from "../../generated/prisma/client";
import { AppError } from "../errors/app-error";
import { ZodError } from "zod";
import logger from "../../config/logger";

export const errorMiddleware = (
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Operational application errors
  if (error instanceof AppError) {
    logger.warn(
      {
        method: req.method,
        url: req.originalUrl,
        statusCode: error.statusCode,
        message: error.message,
      },
      "Application error"
    );

    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  // Zod validation errors
  if (error instanceof ZodError) {
    logger.warn(
      {
        method: req.method,
        url: req.originalUrl,
        issues: error.issues,
      },
      "Request validation failed"
    );

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  // Prisma unique constraint violation
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    logger.warn(
      { method: req.method, url: req.originalUrl, code: error.code },
      "Database unique constraint violation"
    );

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
    logger.warn(
      { method: req.method, url: req.originalUrl, code: error.code },
      "Requested database record not found"
    );

    return res.status(404).json({
      success: false,
      message: "Requested resource was not found",
    });
  }

  // Malformed JSON request body
  if (
    typeof error === "object" &&
    error !== null &&
    "type" in error &&
    error.type === "entity.parse.failed"
  ) {
    logger.warn(
      { method: req.method, url: req.originalUrl },
      "Malformed JSON request body"
    );

    return res.status(400).json({
      success: false,
      message: "Invalid JSON request body",
    });
  }

  // Unexpected errors
  logger.error(
    {
      err: error,
      method: req.method,
      url: req.originalUrl,
    },
    "Unexpected API error"
  );

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};
