import {prisma} from "@/lib/prisma";
import {tr} from "zod/dist/types/v4/locales";

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
        const coordinateCounts = await prisma.coordinate.groupBy({
            by: ['groupId'],
            where: {
                isReject: false,
            },
            _count: {
                id: true,
            },
        });

        const notAcceptedCounts = await prisma.coordinate.groupBy({
            by: ['groupId'],
            where: {
                isAccepted: false,
                isReject: false,
            },
            _count: {
                id: true,
            },
        });

        const groups = await prisma.group.findMany();

        const results = groups.map((group) => {
            const coordinateCount = coordinateCounts.find((c) => c.groupId === group.id);
            const notAccepted = notAcceptedCounts.find((rc) => rc.groupId === group.id);

            return {
                id: group.id,
                name: group.name,
                chatId: group.chatId,
                totalCoordinates: coordinateCount?._count.id ?? 0,     // exclude rejected
                totalIsNotAccepted: notAccepted?._count.id ?? 0,       // only pending (not accepted + not rejected)
            };
        });

        return results;
    }
    ,

    async getAllWithCoordinates() {
        return prisma.group.findMany({
                include: {
                    coordinates: true,
                },
            }
        )
    }
};
