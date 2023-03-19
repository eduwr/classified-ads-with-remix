import { prisma } from "~/db.server";

export const getUserById = async (userId: string) => {
  return prisma.user.findUniqueOrThrow({
    where: {
      userId,
    },
  });
};
