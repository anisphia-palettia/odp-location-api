import {prisma} from "@/lib/prisma.ts";

export const GroupService = {
    async create(data: { name: string; chatId: string }) {
        return prisma.group.create({
            data,
        });
    },
    async getById(id: number) {
        return prisma.group.findUnique({
            where: {id},
        });
    },

    async getByChatId(chatId: string) {
        return prisma.group.findUnique({
            where: {chatId},
        });
    },

    async getAll() {
        return prisma.group.findMany();
    },

    async updateById(id: number, data: { name?: string; chatId?: string }) {
        return prisma.group.update({
            where: {id},
            data,
        });
    },

    async deleteById(id: number) {
        return prisma.group.delete({
            where: {id},
        });
    },

    async deleteByChatId(chatId: string) {
        return prisma.group.delete({
            where: {chatId},
        });
    },

    async getAllWithCoordinateCount() {
        const groups = await prisma.group.findMany({
            include: {
                _count: {
                    select: {
                        coordinates: true,
                    },
                },
            },
        });

        return groups.map(group => ({
            id: group.id,
            name: group.name,
            chatId: group.chatId,
            totalCoordinates: group._count.coordinates,
        }));
    },

    async getWithCoordinatesByChatId(chatId: string) {
        return prisma.group.findUnique({
            where: {chatId},
            include: {
                coordinates: true,
            },
        });
    },

    async getAllWithCoordinates() {
        return prisma.group.findMany({
                include: {
                    coordinates: true,
                },
            }
        )
    }
};
