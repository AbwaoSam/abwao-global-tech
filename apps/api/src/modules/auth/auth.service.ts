
import bcrypt from "bcryptjs";
import prisma from "../../config/prisma";
import { AppError } from "../../common/errors/app-error";
import type { LoginInput, RegisterInput } from "./auth.schema";

const SALT_ROUNDS = 12;

const safeUserSelect = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  emailVerified: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
} as const;

export const registerUser = async (data: RegisterInput) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    throw new AppError("An account with this email already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(
    data.password,
    SALT_ROUNDS
  );

  return prisma.user.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashedPassword,
    },
    select: safeUserSelect,
  });
};

export const loginUser = async (data: LoginInput) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  if (!user.isActive) {
    throw new AppError("This account is inactive", 403);
  }

  const passwordMatches = await bcrypt.compare(
    data.password,
    user.password
  );

  if (!passwordMatches) {
    throw new AppError("Invalid email or password", 401);
  }

  const { password, ...safeUser } = user;

  return safeUser;
};
