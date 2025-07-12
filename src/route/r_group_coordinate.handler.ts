import {LocalHono} from "@/types/LocalHono";
import {sendSuccess} from "@/utils/response";
import {GroupCoordinateService} from "@/service/group-coordinate.service";
import {HTTPException} from "hono/http-exception";

const r_groupCoordinateHandler = new LocalHono()

r_groupCoordinateHandler.get("/:chatId", async (c) => {
    const chatId = c.req.param("chatId");
    const group = await GroupCoordinateService.getGroupCoordinatesByChatId(chatId);
    if (!group) {
        throw new HTTPException(404, {message: "Group not found"});
    }
    return sendSuccess(c, {
        message: "Success get group by id",
        data: {
            id: group.id,
            name: group.name,
            chatId: group.chatId,
            coordinates: group.coordinates.map((coordinate) => ({
                id: coordinate.id,
                latitude: coordinate.lat,
                longitude: coordinate.long,
                image_name: coordinate.imagePath,
                address: coordinate.address,
                isAccepted: coordinate.isAccepted,
                urlId: coordinate.urlId,
                createdAt: coordinate.createdAt,
                updatedAt: coordinate.updatedAt,
            })),
        },
    });
});

export default r_groupCoordinateHandler;
