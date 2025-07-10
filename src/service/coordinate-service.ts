import { prisma } from "@/lib/prisma";
import type { Coordinates } from "@/types/whatsapp";

export const CoordinateService = {
  async create(data: Coordinates, imagePath: string, groupId: number) {
    return prisma.coordinate.create({
      data: {
        imagePath,
        groupId,
        address: data.address,
        lat: data.lat,
        long: data.long,
        urlId: data.urlId,
      },
    });
  },

  async getById(id: number) {
    return prisma.coordinate.findUnique({
      where: { id },
    });
  },

  async getAll() {
    return prisma.coordinate.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  async getByGroupId(groupId: number) {
    return prisma.coordinate.findMany({
      where: { groupId },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  async updateById(
      id: number,
      data: Partial<Pick<Coordinates, "address" | "lat" | "long" | "urlId">> & {
        imagePath?: string;
        groupId?: number;
        isAccepted?: boolean;
      }
  ) {
    return prisma.coordinate.update({
      where: { id },
      data,
    });
  },

  async deleteById(id: number) {
    return prisma.coordinate.delete({
      where: { id },
    });
  },

  async acceptById(id: number) {
    return prisma.coordinate.update({
      where: { id },
      data: { isAccepted: true },
    });
  },

  async rejectById(id: number) {
    return prisma.coordinate.update({
      where: { id },
      data: { isAccepted: false },
    });
  },
};
