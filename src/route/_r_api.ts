import {LocalHono} from "@/types/LocalHono.ts";
import r_startHandler from "@/route/r_start.handler.ts";

const _r_api = new LocalHono()

_r_api.route("/start", r_startHandler)

export default _r_api