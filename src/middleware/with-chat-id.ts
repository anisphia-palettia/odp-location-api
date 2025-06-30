import type {MiddlewareHandler} from "hono";
import {HTTPException} from "hono/http-exception";

export function whitChatId(): MiddlewareHandler {
    return async (c, next) => {
        const chatId = c.req.query("chatId");
        if (!chatId) {
            throw new HTTPException(400, {message: "Missing chatId in query"});
        }
        c.set("chatId", chatId);
        await next();
    }
}