import {LocalHono} from "@/types/LocalHono";
import {GroupService} from "@/service/group-service";
import {sendSuccess} from "@/utils/response";
import {WhatsappService} from "@/service/whatsapp-service";
import {handleServiceResponse} from "@/utils/handle-service-response";

const r_manageGroupHandler = new LocalHono()

r_manageGroupHandler.get("/", async (c) => {
    const groups = await GroupService.getAll()

    return sendSuccess(c, {
        message: "Success get all groups",
        data: groups,
    })
})

r_manageGroupHandler.get("/whatsapp-groups", async (c) => {
    const response = await WhatsappService.chat.group()
    return handleServiceResponse(c, response)
})

export default r_manageGroupHandler