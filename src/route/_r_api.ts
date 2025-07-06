import {LocalHono} from "@/types/LocalHono.ts";
import r_startHandler from "@/route/r_start.handler.ts";
import r_qrHandler from "@/route/r_qr.handler.ts";
import r_odp_filter from "@/route/r_odp_filter.ts";
import r_groupsHandler from "@/route/r_groups.handler.ts";
import r_webhook from "@/route/r_webhook.ts";

const _r_api = new LocalHono();

_r_api.route("/start", r_startHandler);
_r_api.route("/qr", r_qrHandler);
_r_api.route("/odp-filter", r_odp_filter);
_r_api.route("/groups", r_groupsHandler);

export default _r_api;
