import whatsappServiceClient from "@/lib/whatsapp-service-client.ts";
import type {ApiResponse} from "@/types/ApiResponse.ts";

export default function WhatsappService(sessionId: string) {
    return {
        async start(): Promise<ApiResponse> {
            const baseRoute = "/start";
            const response = await whatsappServiceClient.post(baseRoute, null, {
                params: {sessionId: sessionId},
            });
            return response.data;
        },

        async qr(): Promise<ApiResponse<{ qrCode: string }>> {
            const baseRoute = "/qr";
            const response = await whatsappServiceClient.get(baseRoute, {
                params: {sessionId: sessionId},
            });
            return response.data;
        },
        message: {}
    };
}