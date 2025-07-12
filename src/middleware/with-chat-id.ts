import type {MiddlewareHandler} from "hono";
import {HTTPException} from "hono/http-exception";

export function withGroupId(): MiddlewareHandler {
    return async (c, next) => {
        const groupId = c.req.query("chatId");
        if (!groupId) {
            throw new HTTPException(400, {message: "Missing groupId in query"});
        }
        c.set("groupId", groupId);
        await next();
    }
}