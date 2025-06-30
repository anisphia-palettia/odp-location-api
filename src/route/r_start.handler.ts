import {LocalHono} from "@/types/LocalHono.ts";
import WhatsappService from "@/service/whatsapp-service.ts";
import {withSessionId} from "@/middleware/with-session-id.ts";
import {handleServiceResponse} from "@/utils/handle-service-response.ts";

const r_startHandler = new LocalHono()

r_startHandler.post("",
    withSessionId(),
    async (c) => {
        const sessionId = c.get("sessionId")
        const response = await WhatsappService(sessionId).start()
        return handleServiceResponse(c, response)
    })

export default r_startHandler