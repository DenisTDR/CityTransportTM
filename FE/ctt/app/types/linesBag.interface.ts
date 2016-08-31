import {RouteType} from "./routeType.interface";
import {Line} from "./line.interface";
/**
 * Created by tdr on 31/08/16.
 */

export interface LinesBag {
  type: RouteType;
  lines: Line[];
}
