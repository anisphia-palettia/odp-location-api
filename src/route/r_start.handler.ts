import {LocalHono} from "@/types/LocalHono.ts";
import WhatsappService from "@/service/whatsapp-service.ts";
import {handleServiceResponse} from "@/utils/handle-service-response.ts";
import {appConfig} from "@/config/app-config.ts";

const r_startHandler = new LocalHono()

r_startHandler.post("",
    async (c) => {
        const sessionId = appConfig.sessionId
        const response = await WhatsappService(sessionId).start()
        return handleServiceResponse(c, response)
    })

export default r_startHandler