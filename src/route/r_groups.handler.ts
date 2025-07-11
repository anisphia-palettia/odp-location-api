import {LocalHono} from "@/types/LocalHono";
import {GroupService} from "@/service/group-service";
import {sendSuccess} from "@/utils/response";
import {HTTPException} from "hono/http-exception";

const r_groupsHandler = new LocalHono();

r_groupsHandler.get("", async (c) => {
    const groups = await GroupService.getAllWithCoordinateCount();
    return sendSuccess(c, {
        message: "Success get all groups",
        data: groups,
    });
});

r_groupsHandler.get("/:chatId", async (c) => {
    const chatId = c.req.param("chatId");
    const group = await GroupService.getWithCoordinatesByChatId(chatId);
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


export default r_groupsHandler;
