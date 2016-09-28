import {Route} from "./route.interface";
import {RouteType} from "./routeType.interface";
/**
 * Created by NM on 8/23/2016.
 */

export interface Line{
  id: number;
  number: number;
  name: string;
  routes: Route[];
  type: RouteType;
}
//
