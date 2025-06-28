import type {MiddlewareHandler} from "hono";
import {HTTPException} from "hono/http-exception";

export function withClientId(): MiddlewareHandler {
    return async (c, next) => {
        const clientId = c.req.query("clientId");
        if (!clientId) {
            throw new HTTPException(400, {message: "Missing clientId in query"});
        }
        c.set("clientId", clientId);
        await next();
    }
}