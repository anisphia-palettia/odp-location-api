import {Hono} from "hono";

type Variables = {
    sessionId: string;
<<<<<<< HEAD
    chatId: string;
=======
>>>>>>> fcbe43286b97e0c570b5621429d10485615e6254
};

export class LocalHono extends Hono<{
    Variables: Variables;
}> {
}