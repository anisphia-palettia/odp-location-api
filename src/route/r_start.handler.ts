import {LocalHono} from "@/types/LocalHono";
import {handleServiceResponse} from "@/utils/handle-service-response";
import {appConfig} from "@/config/app-config";
import {WhatsappService} from "@/service/whatsapp-service";

const r_startHandler = new LocalHono()

r_startHandler.post("",
    async (c) => {
        const sessionId = appConfig.sessionId
        const response = await WhatsappService.start()
        return handleServiceResponse(c, response)
    })

export default r_startHandler