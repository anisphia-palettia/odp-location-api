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
        const results = await prisma.group.findMany();
        results.sort((a, b) => a.name.localeCompare(b.name));
        return results;
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
            where: {isAccepted: true, isReject: false},
            _count: {id: true},
        });

        const notAcceptedCounts = await prisma.coordinate.groupBy({
            by: ['groupId'],
            where: {isAccepted: false, isReject: false},
            _count: {id: true},
        });

        const coordinateMap = new Map(coordinateCounts.map(c => [c.groupId, c._count.id]));
        const notAcceptedMap = new Map(notAcceptedCounts.map(c => [c.groupId, c._count.id]));

        const groups = await prisma.group.findMany();

        const results = groups.map(group => ({
            id: group.id,
            name: group.name,
            chatId: group.chatId,
            totalCoordinates: coordinateMap.get(group.id) ?? 0,
            totalIsNotAccepted: notAcceptedMap.get(group.id) ?? 0,
        }));

        results.sort((a, b) => a.name.localeCompare(b.name));

        return results;
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
