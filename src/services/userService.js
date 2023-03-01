import { prisma } from "../lib/Prisma.js";
import bcrypt from "bcrypt";

export async function createUserService(name, email, password) {
  password = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      email: email,
      name: name,
      passowrd: password,
    },
  });
}

export async function findByEmailService(email) {
  return prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      email: true,
    },
  });
}
export async function findByIdService(id) {
  return prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });
}
export async function findAllUserService() {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });
}
