import {LocalHono} from "@/types/LocalHono.ts";
import WhatsappService from "@/service/whatsapp-service.ts";
import {withSessionId} from "@/middleware/with-session-id.ts";
import {handleServiceResponse} from "@/utils/handle-service-response.ts";

const r_qrHandler = new LocalHono()

r_qrHandler.post("",
    withSessionId(),
    async (c) => {
        const sessionId = c.get("sessionId")
        const response = await WhatsappService(sessionId).qr()
        return handleServiceResponse(c, response)
    })

export default r_qrHandler