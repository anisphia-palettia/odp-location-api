import {LocalHono} from "@/types/LocalHono";
import r_startHandler from "@/route/r_start.handler";
import r_qrHandler from "@/route/r_qr.handler";
import r_odp_filter from "@/route/r_odp_filter.handler";
import r_groupsHandler from "@/route/r_groups.handler";
import r_kmlHandler from "@/route/r_kml.handler";
import r_coordinateHandler from "@/route/r_coordinate.handler";

const _r_api = new LocalHono();

_r_api.route("/start", r_startHandler);
_r_api.route("/qr", r_qrHandler);
_r_api.route("/odp-filter", r_odp_filter);
_r_api.route("/groups", r_groupsHandler);
_r_api.route("/kml", r_kmlHandler);
_r_api.route("/coordinate", r_coordinateHandler);

export default _r_api;
