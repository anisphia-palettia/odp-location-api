import {Hono} from "hono";

type Variables = {
    sessionId: string;
    groupId: string;
}

export class LocalHono extends Hono<{
    Variables: Variables;
}> {
}