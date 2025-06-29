import {Hono} from "hono";

type Variables = {
    sessionId: string;
};

export class LocalHono extends Hono<{
    Variables: Variables;
}> {
}