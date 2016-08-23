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

@Component({
  templateUrl: 'build/pages/routes-list/routes-list.html',
  directives: [RouteTypeMenu],
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
    // this.gotRoutes(null);
    // return;
    if(this.loading) return;
    this.loading = true;
    console.log("getting routes for: " + this.selectedRouteType.name);
    this.apiService.getRoutes(this.selectedRouteType)
      .subscribe(
        data => {
          console.log("data");
          this.gotRoutes(data.json().data);
        },
        err => {
          console.log("err", err);
        },
        () => {
          console.log('Random Quote Complete');
          this.loading = false;
        }
      );

  }
  gotRoutes(data: any) {
    if(data === null) {
      this.lines = [];
      for(var i = 0; i < 15; i ++) {
        this.lines.push({
          id: 22 + i,
          name: "123" + i,
          rawName: "B" + i,
          routes: [],
          type: "bus"
        });
      }

      return;
    }
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
