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
<<<<<<< HEAD
        message: {
            messageRoute: "/message",
            async byChatId(chatId: string): Promise<ApiResponse> {
                const baseRoute = this.messageRoute;
                const response = await whatsappServiceClient.get(baseRoute, {
                    params: {sessionId: sessionId, chatId: chatId},
                })
                return response.data;
            }
        },
        chat: {
            chatRoute: "/chats",
            async group(): Promise<ApiResponse> {
                const baseRoute = this.chatRoute + "/group";
                const response = await whatsappServiceClient.get(baseRoute, {
                    params: {sessionId: sessionId},
                })
                return response.data;
            }
        }
=======
        message: {}
>>>>>>> fcbe43286b97e0c570b5621429d10485615e6254
    };
}