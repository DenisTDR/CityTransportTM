/**
 * Created by tdr on 18/08/16.
 */


import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {RouteTypeMenu} from '../route-type-menu/route-type-menu'
import {Globals} from '../globals';
import {RouteType} from "../../types/routeType.interface";
import {ApiService} from "../../services/api.service";

@Component({
  templateUrl: 'build/pages/routes-list/routes-list.html',
  directives: [RouteTypeMenu],
  providers: [ApiService]
})
export class RoutesListPage {
  private selectedRouteType: RouteType;

  private loading: boolean;

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
    console.log("getting routes for: " + this.selectedRouteType.name);
    this.apiService.getRoutes(this.selectedRouteType);
    //   .subscribe(
    //   data => {
    //     console.log(data);
    //   },
    //   err => {
    //     console.log(err);
    //   },
    //   () => console.log('Movie Search Complete')
    // );
  }

  selectedRouteTypeChanged(arg) {
    this.selectedRouteType = arg;
    console.log("in RouteListPage selectedRouteTypeChanged: ", arg);
  }
}
