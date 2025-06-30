import {LocalHono} from "@/types/LocalHono.ts";
import r_startHandler from "@/route/r_start.handler.ts";
<<<<<<< HEAD
import r_qrHandler from "@/route/r_qr.handler.ts";
import r_odp_filter from "@/route/r_odp_filter.ts";
import r_groupsHandler from "@/route/r_groups.handler.ts";
=======
>>>>>>> fcbe43286b97e0c570b5621429d10485615e6254

const _r_api = new LocalHono()

_r_api.route("/start", r_startHandler)
<<<<<<< HEAD
_r_api.route("/qr", r_qrHandler)

_r_api.route("/odp-filter", r_odp_filter)
_r_api.route("/groups", r_groupsHandler)
=======
>>>>>>> fcbe43286b97e0c570b5621429d10485615e6254

export default _r_api