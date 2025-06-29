import type {MiddlewareHandler} from "hono";
import {HTTPException} from "hono/http-exception";

export function withSessionId(): MiddlewareHandler {
    return async (c, next) => {
        const sessionId = c.req.query("sessionId");
        if (!sessionId) {
            throw new HTTPException(400, {message: "Missing sessionId in query"});
        }
        c.set("sessionId", sessionId);
        await next();
    }
}