
import { Router } from "express";
import userRoutes from "../../modules/users/user.routes";

const router = Router();

// User management endpoints
router.use("/users", userRoutes);

export default router;
