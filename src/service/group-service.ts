import {prisma} from "@/lib/prisma.ts";

export const GroupService = {
    async create(data: { name: string, chatId: string }) {
        return prisma.group.create({
            data
        })
    },
    async getByChatId(chatId: string) {
        return prisma.group.findUnique({
            where: {chatId}
        })
    }
}