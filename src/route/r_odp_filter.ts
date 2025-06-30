import {LocalHono} from "@/types/LocalHono.ts";
import {withSessionId} from "@/middleware/with-session-id.ts";
import {whitChatId} from "@/middleware/with-chat-id.ts";
import WhatsappService from "@/service/whatsapp-service.ts";
import {sendSuccess} from "@/utils/response.ts";
import {handleServiceResponse} from "@/utils/handle-service-response.ts";

const m_odpFilter = new LocalHono()

m_odpFilter.get("",
    withSessionId(),
    whitChatId(),
    async (c) => {
        const sessionId = c.get("sessionId")
        const chatId = c.get("chatId")
        const filteredMessage = await WhatsappService(sessionId).message.byChatId(chatId)
        return handleServiceResponse(c, filteredMessage)
    }
)

export default m_odpFilter