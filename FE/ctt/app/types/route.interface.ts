import {Station} from "./station.interface";
import {Line} from "./line.interface";
/**
 * Created by tdr on 29/08/16.
 */

export class Route {
  id: number;
  line: Line;
  stations: Station[];

  constructor() {

  }

  getFirstStation() : Station {
    return this.stations[0];
  }
  getLastStation() : Station {
    return this.stations[this.stations.length - 1];
  }

}
