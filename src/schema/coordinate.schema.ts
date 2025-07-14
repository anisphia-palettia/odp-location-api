import {z} from "zod";

export const CoordinateSchema = {
    update: z.object({
        lat: z.string().optional(),
        long: z.string().optional(),
        address: z.string().optional(),
        urlId: z.string().optional(),
        url: z.string().optional(),
        isAccepted: z.boolean().optional(),
        isReject: z.boolean().optional(),
    }),
}

export  type CoordinateUpdateInput = z.infer<typeof CoordinateSchema.update>