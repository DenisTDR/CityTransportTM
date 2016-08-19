/**
 * Created by tdr on 18/08/16.
 */


import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {RouteTypeMenu} from '../route-type-menu/route-type-menu'
import {Globals} from '../globals';
import {RouteType} from "../../types/routeType.interface";

@Component({
  templateUrl: 'build/pages/routes-list/routes-list.html',
  directives: [RouteTypeMenu]
})
export class RoutesListPage {
  private selectedRouteType: RouteType;
  constructor(private navCtrl: NavController) {
    console.log("RoutesListPage constructor");
    // this.routeTypeMenu = RouteTypeMenu;
    this.selectedRouteType = Globals.selectedRouteType;
  }
  ngOnInit () {
    console.log("ngOnInit in RoutesListPage");
    // console.log("sel:" + Globals.selectedRouteType);

  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter in RoutesListPage");
    console.log("RouteListPage.selectedRouteType = " + this.selectedRouteType);
  }

  selectedRouteTypeChanged(arg) {
    this.selectedRouteType = arg;
    console.log("in RouteListPage selectedRouteTypeChanged: ", arg);
  }
}
