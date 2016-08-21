import {RouteType} from "../types/routeType.interface";
/**
 * Created by tdr on 19/08/16.
 */


console.log("globals parsed");

module G1{
  var h1 = "da?";
}

// export var globals = new GlobalsContainer();

export class Globals {
  static routeTypes: RouteType[] = [
    {
      name: "bus",
      icon: {
        type: "ion",
        name: "bus"
      },
      activeColor: "#e62739"
    },
    {
      name: "trolley",
      icon: {
        type: "fa",
        name: "bus"
      },
      activeColor: "#FFB133"
    },
    {
      name: "tram",
      icon: {
        type: "fa",
        name: "train"
      },
      activeColor: "#555555"
    },
    {
      name: "bike",
      icon: {
        type: "ion",
        name: "bicycle"
      },
      activeColor: "#8a65c5"
    },
    {
      name: "boat",
      icon: {
        type: "ion",
        name: "boat"
      },
      activeColor: "#6ed3cf"
    }
  ];
  static selectedRouteType: RouteType = Globals.routeTypes[2];

  private static init: string = Globals.initMethod();

  static initMethod(): string {
    Globals.setSelectedRouteTypeName("tram");
    return null;
  }

  static setSelectedRouteType (type: RouteType) {
    Globals.routeTypes.forEach(function(type) {
      type.active = false;
    });
    console.log("selected routeType => " + type.name);
    type.active = true;
    Globals.selectedRouteType = type;
    // console.log("end setSelectedRouteType");
  }

  static setSelectedRouteTypeName (typeName: string) {
    Globals.routeTypes.forEach(function(type) {
      if(type.name == typeName) {
        Globals.setSelectedRouteType(type);
      }
    });
  }
}
