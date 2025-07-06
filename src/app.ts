import {LocalHono} from "@/types/LocalHono.ts";
import _r_api from "@/route/_r_api.ts";
import errorHandler from "@/middleware/error-handler.ts";
import r_webhook from "@/route/r_webhook.ts";
import { serveStatic } from '@hono/node-server/serve-static'

const app = new LocalHono()

app.use('/public/*', serveStatic({ root: './' }))

app.route("/web-hook", r_webhook);
app.route("/api", _r_api)

app.onError(errorHandler)
export default app