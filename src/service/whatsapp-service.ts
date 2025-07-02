import whatsappServiceClient from "@/lib/whatsapp-service-client.ts";
import type {ApiResponse} from "@/types/ApiResponse.ts";
import {appConfig} from "@/config/app-config.ts";

export default function WhatsappService(sessionId: string = appConfig.sessionId) {
    return {
        async start(): Promise<ApiResponse> {
            const baseRoute = "/start";
            const response = await whatsappServiceClient.post(baseRoute, null, {
                params: {sessionId},
            });
            return response.data;
        },

        async qr(): Promise<ApiResponse<{ qrCode: string }>> {
            const baseRoute = "/qr";
            const response = await whatsappServiceClient.get(baseRoute, {
                params: {sessionId},
            });
            return response.data;
        },

        message: {
            messageRoute: "/message",
            async byChatId(chatId: string): Promise<ApiResponse> {
                const baseRoute = this.messageRoute;
                const response = await whatsappServiceClient.get(baseRoute, {
                    params: {sessionId, chatId},
                });
                return response.data;
            },
            async text(text: string, recipient: string, msg: any): Promise<ApiResponse> {
                const baseRoute = this.messageRoute + "/text";
                const response = await whatsappServiceClient.post(baseRoute, {
                    text, recipient, msg
                }, {params: {sessionId, isToGroup: true}})
                return response.data;
            }
        },

        chat: {
            chatRoute: "/chats",
            async group(): Promise<ApiResponse> {
                const baseRoute = this.chatRoute + "/group";
                const response = await whatsappServiceClient.get(baseRoute, {
                    params: {sessionId},
                });
                return response.data;
            },
        },
    };
}
