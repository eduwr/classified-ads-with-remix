import type { Advertising } from "@prisma/client";

import { prisma } from "~/db.server";

export function getAdvertising({ slug }: Pick<Advertising, "slug">) {
  return prisma.advertising.findFirst({
    where: { slug },
  });
}

export function getAdvertisingListItems() {
  return prisma.advertising.findMany({
    orderBy: { updatedAt: "desc" },
  });
}

export function createAdvertising({
  title,
  description,
  tags,
  slug,
}: Pick<Advertising, "slug" | "title" | "description" | "tags">) {
  return prisma.advertising.create({
    data: {
      title,
      description,
      tags,
      slug,
    },
  });
}

// TODO Refactor this code to use advertisingId instead of slug.
export function deleteAdvertising({ slug }: Pick<Advertising, "slug">) {
  return prisma.advertising.deleteMany({
    where: { slug },
  });
}
