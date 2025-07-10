import {LocalHono} from "@/types/LocalHono";
import _r_api from "@/route/_r_api";
import errorHandler from "@/middleware/error-handler";
import r_webhook from "@/route/r_webhook";
import {serveStatic} from '@hono/node-server/serve-static'
import {cors} from 'hono/cors'


const app = new LocalHono()

app.use(cors())

app.use('/public/*', serveStatic({root: './'}))

app.route("/web-hook", r_webhook);
app.route("/api", _r_api)

app.onError(errorHandler)
export default app