import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();

app.use(helmet());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "AGTE API is running",
    application: "Abwao Global Tech Enterprise",
    timestamp: new Date().toISOString(),
  });
});

export default app;