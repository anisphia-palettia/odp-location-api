import { prisma } from "@/lib/prisma.ts";
import type { Coordinates } from "@/types/whatsapp.ts";

export const CoordinateService = {
  async create(data: Coordinates, imagePath: string, groupId: number) {
    return prisma.coordinate.create({
      data: {
        groupId,
        imagePath,
        address: data.address,
        lat: data.lat,
        long: data.long,
      },
    });
  },
};
