import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

declare global {
  var prismaClient: PrismaClient;
}

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prismaClient) {
    global.prismaClient = new PrismaClient();
  }
  prisma = global.prismaClient;
}

export default prisma;
