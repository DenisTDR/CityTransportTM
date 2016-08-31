import {Point} from "./point.interface";
/**
 * Created by tdr on 29/08/16.
 */

export interface Station{
  id: string;
  name: string;
  rawName: string;
  junction: string;
  coords?: Point;
}
