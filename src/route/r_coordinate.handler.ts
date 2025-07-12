import {LocalHono} from "@/types/LocalHono";
import {CoordinateService} from "@/service/coordinate-service";
import {sendSuccess} from "@/utils/response";
import {CoordinateSchema, type CoordinateUpdateInput} from "@/schema/coordinate.schema";
import {getCoordinatesFromPage} from "@/utils/scrapping";
import validate from "@/middleware/validate";

const r_coordinateHandler = new LocalHono()

r_coordinateHandler.get("", async (c) => {
    const coordinates = await CoordinateService.getAll()
    return sendSuccess(c, {
        message: "Success get all coordinates",
        data: coordinates,
    })
})

r_coordinateHandler.get("/:id", async (c) => {
    const id = c.req.param("id")
    const coordinate = await CoordinateService.getById(Number(id))
    if (!coordinate) {
        throw new Error("Coordinate not found")
    }
    return sendSuccess(c, {
        message: "Success get coordinate by id",
        data: coordinate,
    })
})

r_coordinateHandler.put("/:id", validate("json", CoordinateSchema.update), async (c) => {
    const id = c.req.param("id")
    const data = c.req.valid("json") as CoordinateUpdateInput

    let updatedData = data

    if (data.url) {
        const result = await getCoordinatesFromPage(data.url)
        if (!result || !result.lat || !result.long) {
            return sendSuccess(c, {
                message: "Failed update coordinate",
            })
        }

        updatedData = {
            ...data,
            ...result,
        }
    }

    delete updatedData.url

    await CoordinateService.updateById(Number(id), updatedData)

    return sendSuccess(c, {
        message: "Success update coordinate",
    })
})


export default r_coordinateHandler
