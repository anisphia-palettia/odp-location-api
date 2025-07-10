import {LocalHono} from "@/types/LocalHono";
import WhatsappService from "@/service/whatsapp-service";
import {handleServiceResponse} from "@/utils/handle-service-response";
import {appConfig} from "@/config/app-config";

const r_startHandler = new LocalHono()

r_startHandler.post("",
    async (c) => {
        const sessionId = appConfig.sessionId
        const response = await WhatsappService(sessionId).start()
        return handleServiceResponse(c, response)
    })

export default r_startHandler