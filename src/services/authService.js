import { prisma } from "../lib/Prisma.js";
import jwt from "jsonwebtoken";

export async function findByEmailService(email) {
  return prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      email: true,
      passowrd: true,
      role: true,
    },
  });
}

export async function generateToken(id, role) {
  return jwt.sign({ id: id, role: role }, process.env.SECRET_JWT, {
    expiresIn: 86400,
  });
}
