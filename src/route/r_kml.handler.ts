import {LocalHono} from "@/types/LocalHono.ts";
import {GroupService} from "@/service/group-service.ts";
import {generateAllGroupsKML, generateKML} from "@/utils/generate-kml.ts";
import {HTTPException} from "hono/http-exception";

const r_kmlHandler = new LocalHono()

r_kmlHandler.get("/kml", async (c) => {
    const groups = await GroupService.getAllWithCoordinates();
    if (!groups || groups.length === 0) {
        throw new HTTPException(404, {message: "No groups found"});
    }
    const kmlContent = generateAllGroupsKML(groups);
    return new Response(kmlContent, {
        status: 200,
        headers: {
            "Content-Type": "application/vnd.google-earth.kml+xml",
            "Content-Disposition": `attachment; filename="semua_group.kml"`,
        },
    });
});

r_kmlHandler.get("/kml/:chatId", async (c) => {
    const chatId = c.req.param("chatId");
    const group = await GroupService.getWithCoordinatesByChatId(chatId);
    if (!group) {
        throw new HTTPException(404, {message: "Group not found"});
    }
    const kmlContent = generateKML(group.name, group.coordinates);
    return new Response(kmlContent, {
        status: 200,
        headers: {
            "Content-Type": "application/vnd.google-earth.kml+xml",
            "Content-Disposition": `attachment; filename="${group.name}.kml"`,
        },
    });
});


export default r_kmlHandler