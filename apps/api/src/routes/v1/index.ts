import { Router } from "express";
import userRoutes from "../../modules/users/user.routes";
import authRoutes from "../../modules/auth/auth.routes";

const router = Router();

// Authentication endpoints
router.use("/auth", authRoutes);

// User management endpoints
router.use("/users", userRoutes);

export default router;