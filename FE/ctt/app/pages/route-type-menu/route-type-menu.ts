/**
 * Created by tdr on 18/08/16.
 */



import {Component, EventEmitter} from '@angular/core';
import {NavController} from 'ionic-angular';
import {IONIC_DIRECTIVES} from 'ionic-angular';
import {Globals} from '../globals';
import {RouteType} from "../../types/routeType.interface";

@Component({
  templateUrl: 'build/pages/route-type-menu/route-type-menu.html',
  selector: 'route-type-menu',
  directives: [IONIC_DIRECTIVES],
  inputs: ['selectedRouteType', 'someProp'],
  outputs: ['selectedRouteTypeChanged', 'viewChanged']
})
export class RouteTypeMenu {
  public selectedRouteType: RouteType;
  public selectedRouteTypeChanged: EventEmitter<RouteType> = new EventEmitter<RouteType>();
  public viewChanged: EventEmitter<RouteTypeMenu> = new EventEmitter<RouteTypeMenu>();
  public visible: boolean = true;
  public someProp: string;
  private Globals: Globals;

  constructor(private navCtrl: NavController) {
    console.log("RouteTypeMenu constructor");
    this.Globals = Globals;
    this.someProp = "a";
  }

  activateType(type: RouteType) {
    if(type.active) return;
    console.log("clicked: " + type.name);
    Globals.setSelectedRouteType(type);
    this.selectedRouteTypeChanged.emit(type);
  }
  setVisible (visible: boolean) {
    // console.log("RouteTypeMenu visible changed to " + visible);
    this.viewChanged.emit(this);
    this.visible = visible;
  }
}
