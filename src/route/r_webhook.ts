import {LocalHono} from "@/types/LocalHono.ts";
import {sendSuccess} from "@/utils/response.ts";
import type {IMessage} from "@/types/whatsapp.ts";

const r_webhook = new LocalHono()

r_webhook.post("", async (c) => {
    const data = await c.req.json() as IMessage
    return sendSuccess(c, {
        message: "Success save",
        data
    })
})

export default r_webhook;

