import {ApiService} from "../../services/api.service";
import {MapPartial} from "../partials/map-partial/map-partial";
import {RouteTypeMenu} from "../route-type-menu/route-type-menu";
import {Component} from "@angular/core/esm";
import {NavController, Platform} from 'ionic-angular';
/**
 * Created by Aida on 9/5/2016.
 */

@Component({
  templateUrl: 'build/pages/routes-list/routes-list.html',
  directives: [RouteTypeMenu, MapPartial],
  providers: [ApiService]
})
export class RouteStationsPage {

  constructor(private navCtrl: NavController, private apiService: ApiService) {
    console.log("RouteStationsPage constructor");
    // this.routeTypeMenu = RouteTypeMenu;
  }
  ngOnInit () {
    console.log("ngoninit in RouteStationsPage");
  }
}
