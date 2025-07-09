import {LocalHono} from "@/types/LocalHono.ts";
import {CoordinateService} from "@/service/coordinate-service.ts";
import {sendSuccess} from "@/utils/response.ts";
import validate from "@/middleware/validate.ts";
import {CoordinateSchema} from "@/schema/coordinate.schema.ts";
import {getCoordinatesFromPage} from "@/utils/scrapping.ts";

const r_coordinateHandler = new LocalHono()

r_coordinateHandler.put("/:id/url", validate("json", CoordinateSchema.updateByUrl), async (c) => {
    const id = c.req.param("id")
    const data = c.req.valid("json")
    const result = await getCoordinatesFromPage(data.url)
    if (!result) {
        return sendSuccess(c, {
            message: "Failed update coordinate",
        })
    }
    await CoordinateService.updateById(Number(id), {...result, isAccepted: true})
    return sendSuccess(c, {
        message: "Success update coordinate",
    })
})

export default r_coordinateHandler
