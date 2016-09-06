import {MapPartial} from "../partials/map-partial/map-partial";
import {RouteTypeMenu} from "../route-type-menu/route-type-menu";
import {Component} from "@angular/core";
import {NavController, Platform, NavParams} from 'ionic-angular';

import {Line} from "../../types/line.interface";
import {ApiService} from "../../services/api.service";
/**
 * Created by Aida on 9/5/2016.
 */

@Component({
  templateUrl: 'build/pages/route-stations/route-stations.html',
  directives: [RouteTypeMenu, MapPartial],
  providers: [ApiService]
})
export class RouteStationsPage {
  private selectedLineId: string;
  private line: Line;
  private currentDirection;
  constructor(private navCtrl: NavController, private apiService: ApiService, navParams: NavParams) {
    console.log("RouteStationsPage constructor");
    this.selectedLineId = navParams.get('selectedLineId');
    console.log("with: " + this.selectedLineId);
    // this.routeTypeMenu = RouteTypeMenu;
    this.currentDirection = 0;
  }
  ngOnInit () {

    console.log("ngoninit in RouteStationsPage");
    this.getLine();
  }


  private getLine() {
    console.log("inceput");
    this.apiService.getLine(this.selectedLineId).subscribe(
      line => {
        console.log('got value ', line);
        this.line = line;
      },
      err => console.error('something wrong occurred: ' + err),
      () => console.log('done')
    );
  }

  private toggleDirections(){
    if(this.currentDirection ==0)
      this.currentDirection = 1;
    else this.currentDirection = 0;
  }


}
