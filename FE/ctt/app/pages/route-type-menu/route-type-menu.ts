/**
 * Created by tdr on 18/08/16.
 */



import {Component, EventEmitter} from '@angular/core';
import {NavController, List} from 'ionic-angular';
import {IONIC_DIRECTIVES} from 'ionic-angular';
import {Globals} from '../globals';
import {RouteType} from "../../types/routeType.interface";

@Component({
  templateUrl: 'build/pages/route-type-menu/route-type-menu.html',
  selector: 'route-type-menu',
  directives: [IONIC_DIRECTIVES],
  inputs: ['selectedRouteType'],
  outputs: ['selectedRouteTypeChanged']
})
export class RouteTypeMenu {
  public selectedRouteType: RouteType;
  public selectedRouteTypeChanged: EventEmitter<RouteType> = new EventEmitter<RouteType>();
  private Globals: any;

  constructor(private navCtrl: NavController) {
    console.log("RouteTypeMenu constructor");
    this.Globals = Globals;
  }

  activateType(type: RouteType) {
    if(type.active) return;
    console.log("clicked: " + type.name);
    Globals.setSelectedRouteType(type);

    this.selectedRouteTypeChanged.emit(type);
  }
}
