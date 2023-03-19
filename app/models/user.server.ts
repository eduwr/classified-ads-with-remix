import { prisma } from "~/db.server";

import type { User } from "@prisma/client";

export const getUserById = async (userId: string) => {
  return prisma.user.findUniqueOrThrow({
    where: {
      userId,
    },
  });
};

export const createUser = async ({
  email,
  firstName,
  lastName,
  middleName,
}: Pick<
  User,
  "email" | "firstName" | "lastName" | "middleName"
>): Promise<User> => {
  let { nanoid } = await import("nanoid");

  return prisma.user.create({
    data: {
      userId: nanoid(),
      email,
      firstName,
      middleName,
      lastName,
    },
  });
};
