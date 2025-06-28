import {LocalHono} from "@/types/LocalHono.ts";
import _r_api from "@/route/_r_api.ts";
import errorHandler from "@/middleware/error-handler.ts";

const app = new LocalHono()

app.route("/api", _r_api)

app.onError(errorHandler)
export default app