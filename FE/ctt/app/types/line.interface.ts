import {Route} from "./route.interface";
/**
 * Created by NM on 8/23/2016.
 */

export interface Line{
  id?: number;
  name?: string;
  rawName?: string;
  routes?: Route[];
  type?: string;
}
//
