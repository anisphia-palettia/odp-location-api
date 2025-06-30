import {LocalHono} from "@/types/LocalHono.ts";
import {withSessionId} from "@/middleware/with-session-id.ts";
import WhatsappService from "@/service/whatsapp-service.ts";
import {handleServiceResponse} from "@/utils/handle-service-response.ts";

const r_groupsHandler = new LocalHono()

r_groupsHandler.get("",
    withSessionId(),
    async (c) => {
        const sessionId = c.get("sessionId")
        const response = await WhatsappService(sessionId).chat.group()
        return handleServiceResponse(c, response)
    }
)

export default r_groupsHandler