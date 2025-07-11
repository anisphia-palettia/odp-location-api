import { prisma } from "@/lib/prisma";

export const ErrorService = {
    async create(url: string, groupId: number) {
        return prisma.error.create({
            data: {
                url,
                groupId,
            },
        });
    },

    async update(isDone: boolean, id: number) {
        return prisma.error.update({
            where: { id },
            data: {
                done: isDone,
            },
        });
    },
};
