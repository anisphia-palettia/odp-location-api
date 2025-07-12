import {LocalHono} from "@/types/LocalHono";
import {GroupService} from "@/service/group-service";
import {sendSuccess} from "@/utils/response";
import {HTTPException} from "hono/http-exception";

const r_groupsHandler = new LocalHono();

r_groupsHandler.get("/", async (c) => {
    const groups = await GroupService.getAllWithCoordinateCount();
    return sendSuccess(c, {
        message: "Success get all groups with coordinate count",
        data: groups,
    });
});


export default r_groupsHandler;
