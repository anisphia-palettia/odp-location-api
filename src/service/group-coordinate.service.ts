import {prisma} from "@/lib/prisma";

export const GroupCoordinateService = {
    async getGroupCoordinatesByChatId(chatId: string) {
        return prisma.group.findUnique({
            where: {chatId},
            include: {
                coordinates: {
                    orderBy: {
                        createdAt: "asc"
                    },
                },
            },
        });
    }
}