import {LocalHono} from "@/types/LocalHono.ts";
import {whitChatId} from "@/middleware/with-chat-id.ts";
import WhatsappService from "@/service/whatsapp-service.ts";
import {handleServiceResponse} from "@/utils/handle-service-response.ts";
import {appConfig} from "@/config/app-config.ts";

const m_odpFilter = new LocalHono()

m_odpFilter.get("",
    whitChatId(),
    async (c) => {
        const sessionId = appConfig.sessionId
        const chatId = c.get("chatId")
        const filteredMessage = await WhatsappService(sessionId).message.byChatId(chatId)
        return handleServiceResponse(c, filteredMessage)
    }
)

export default m_odpFilter