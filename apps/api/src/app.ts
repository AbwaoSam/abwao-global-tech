import express from "express";
import cors from "cors";
import helmet from "helmet";
import prisma from "./config/prisma";
import v1Router from "./routes/v1";
import pinoHttp from "pino-http";
import logger from "./config/logger";
import { errorMiddleware } from "./common/middleware/error.middleware";

const app = express();

app.use(
  pinoHttp({
    logger,
    autoLogging: true,
  })
);

app.use(helmet());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

app.use("/api/v1", v1Router);

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "AGTE API is running",
    application: "Abwao Global Tech Enterprise",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/health/database", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      success: true,
      message: "Database connection successful",
      database: "PostgreSQL",
    });
  } catch (error) {
    logger.error(
      { err: error },
      "Database health check failed"
    );

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

app.use(errorMiddleware);

export default app;