import {LocalHono} from "@/types/LocalHono.ts";
import WhatsappService from "@/service/whatsapp-service.ts";
import {handleServiceResponse} from "@/utils/handle-service-response.ts";
import {appConfig} from "@/config/app-config.ts";

const r_groupsHandler = new LocalHono()

r_groupsHandler.get("",
    async (c) => {
        const sessionId = appConfig.sessionId
        const response = await WhatsappService(sessionId).chat.group()
        return handleServiceResponse(c, response)
    }
)

export default r_groupsHandler