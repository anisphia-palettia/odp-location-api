import {Hono} from "hono";

type Variables = {
    clientId: string;
};

export class LocalHono extends Hono<{
    Variables: Variables;
}> {
}