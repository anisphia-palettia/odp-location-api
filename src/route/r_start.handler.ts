import {LocalHono} from "@/types/LocalHono.ts";
import WhatsappService from "@/service/whatsapp-service.ts";
import {withClientId} from "@/middleware/with-client-id.ts";
import {handleServiceResponse} from "@/utils/handle-service-response.ts";

const r_startHandler = new LocalHono()

r_startHandler.post("", withClientId(), async (c) => {
    const clientId = c.get("clientId")
    const response = await WhatsappService(clientId).start()
    return handleServiceResponse(c, response)
})

export default r_startHandler