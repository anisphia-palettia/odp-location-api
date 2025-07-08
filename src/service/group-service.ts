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
