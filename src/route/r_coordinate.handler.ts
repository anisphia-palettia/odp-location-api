import {LocalHono} from "@/types/LocalHono.ts";
import {CoordinateService} from "@/service/coordinate-service.ts";
import {sendSuccess} from "@/utils/response.ts";

const r_coordinateHandler = new LocalHono()

r_coordinateHandler.put("/:id", async (c) => {
    const id = c.req.param("id")
    const data = await c.req.json()
    await CoordinateService.updateById(Number(id), data)
    return sendSuccess(c, {
        message: "Success update coordinate",
    })
})

export default r_coordinateHandler
