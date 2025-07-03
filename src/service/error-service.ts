import {prisma} from "@/lib/prisma.ts";

export const ErrorService = {
    async create(url: string) {
        return prisma.error.create({
            data: {
                url
            }
        })
    }, async update(isDone: boolean, id: number) {
        return prisma.error.update({
            where: {id},
            data: {
                done: isDone
            }
        })
    }
}