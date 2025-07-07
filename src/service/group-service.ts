import {prisma} from "@/lib/prisma.ts";

export const GroupService = {
    async create(data: { name: string; chatId: string }) {
        return prisma.group.create({
            data,
        });
    },
    async getByChatId(chatId: string) {
        return prisma.group.findUnique({
            where: {chatId},
        });
    },
    async updateById(id: number, name: string) {
        return prisma.group.update({
            where: {
                id,
            },
            data: {
                name,
            },
        });
    },

    async all() {
        return prisma.group.findMany();
    },

    async findByChatIdAndCoordinates(chatId: string) {
        return prisma.group.findUnique({
            where: {chatId},
            include: {
                coordinates: true,
            },
        });
    },

    async combinedAll() {
        return prisma.group.findMany({
                include: {
                    coordinates: true,
                },
            }
        )
    }
};
