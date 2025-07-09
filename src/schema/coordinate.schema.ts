import {z} from "zod";

export const CoordinateSchema = {
    update: z.object({
        lat: z.number().optional(),
        long: z.number().optional(),
        address: z.string().optional(),
        urlId: z.string().optional(),
        isAccepted: z.boolean().optional(),
    }),
    updateByUrl: z.object({
        url: z.string(),
    })
}