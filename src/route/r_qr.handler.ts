import {LocalHono} from "@/types/LocalHono";
import {handleServiceResponse} from "@/utils/handle-service-response";
import {appConfig} from "@/config/app-config";
import {WhatsappService} from "@/service/whatsapp-service";

const r_qrHandler = new LocalHono()

r_qrHandler.post("",
    async (c) => {
        const sessionId = appConfig.sessionId
        const response = await WhatsappService.qr()
        return handleServiceResponse(c, response)
    })

export default r_qrHandler
