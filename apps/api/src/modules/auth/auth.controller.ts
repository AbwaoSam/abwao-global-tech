import { Request, Response, NextFunction } from "express";
import {
  registerUser,
  loginUser,
} from "./auth.service";
import {
  registerSchema,
  loginSchema,
} from "./auth.schema";

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = registerSchema.parse(req.body);

    const user = await registerUser(validatedData);

    return res.status(201).json({
      success: true,
      message: "Account registered successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = loginSchema.parse(req.body);

    const user = await loginUser(validatedData);

    return res.status(200).json({
      success: true,
      message: "Login credentials verified successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};