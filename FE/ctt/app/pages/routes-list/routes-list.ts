/**
 * Created by tdr on 18/08/16.
 */


import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {RouteTypeMenu} from '../route-type-menu/route-type-menu'
import {Globals} from '../globals';
import {RouteType} from "../../types/routeType.interface";
import {ApiService} from "../../services/api.service";
import {Line} from "../../types/line.interface";
import {MapPartial} from "../partials/map-partial/map-partial";


@Component({
  templateUrl: 'build/pages/routes-list/routes-list.html',
  directives: [RouteTypeMenu, MapPartial],
  providers: [ApiService]
})
export class RoutesListPage {
  private selectedRouteType: RouteType;
  private lines: Line[] = [];
  private loading: boolean = false;

  constructor(private navCtrl: NavController, private apiService: ApiService) {
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

  ionViewDidEnter() {
    this.getRoutes();
  }

  getRoutes() {

    this.apiService.getLinesMock().subscribe(
      data => {
       this.gotRoutes(data);
      },
      err => {

      },
      () => {

      }
    )
  }
  gotRoutes(data: any) {

    console.log("got data");
    console.log(data);
    var tmpLines = [];
    data.forEach(function(line) {
      tmpLines.push(line);
    });
    this.lines = tmpLines;
  }

  selectedRouteTypeChanged(arg) {
    if(this.selectedRouteType && this.selectedRouteType.name == arg.name) return;
    this.selectedRouteType = arg;
    console.log("in RouteListPage selectedRouteTypeChanged: ", arg);

    this.getRoutes();
  }
}
