import {Hono} from "hono";

type Variables = {
    sessionId: string;
    chatId: string;
}

export class LocalHono extends Hono<{
    Variables: Variables;
}> {
}