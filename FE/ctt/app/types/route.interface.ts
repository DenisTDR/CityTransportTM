import {Station} from "./station.interface";
import {Line} from "./line.interface";
/**
 * Created by tdr on 29/08/16.
 */

export class Route {
  id: string;
  stations: Station[];

  constructor() {

  }

  getFirstStation() : Station {
    return (this.stations && this.stations.length) ? this.stations[0] : null;
  }
  getLastStation() : Station {
    return (this.stations && this.stations.length) ? this.stations[this.stations.length - 1] : null;
  }

}
