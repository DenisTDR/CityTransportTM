import {Globals} from "../globals";
import {ApiService} from "../../services/api.service";
import {NavController} from "ionic-angular";

import {RouteTypeMenu} from "../route-type-menu/route-type-menu";
import {Component} from "@angular/core";
import {RouteType} from "../../types/routeType.interface";
import {Line} from "../../types/line.interface";
import {LinesBag} from "../../types/linesBag.interface";
/**
 * Created by tdr on 30/08/16.
 */



@Component({
  templateUrl: 'build/pages/routes-table/routes-table.html',
  directives: [RouteTypeMenu],
  providers: [ApiService]
})
export class RoutesTablePage {
  private selectedRouteType: RouteType;
  private lines: LinesBag[];

  constructor(private navCtrl: NavController, private apiService: ApiService) {
    console.log("RoutesTablePage constructor");
    // this.routeTypeMenu = RouteTypeMenu;
    this.selectedRouteType = Globals.selectedRouteType;
  }
  ngOnInit () {
    console.log("ngOnInit in RoutesTablePage");
    // console.log("sel:" + Globals.selectedRouteType);
    this.getLines();
  }

  private getLines() {
    this.apiService.getLinesMock(this.selectedRouteType).subscribe(
      lines => {
        console.log('got value ', lines);
        this.gotLines(lines);
      },
      err => console.error('something wrong occurred: ' + err),
      () => console.log('done')
    );
  }

  private gotLines(lines:Line[]) {
    this.lines = [];
    var globalLines = this.lines;
    var crtBag: LinesBag = null;
    lines.forEach(function(line) {
      if(!crtBag || crtBag.type && crtBag.type.name != line.type.name) {
        crtBag = {type: null, lines: null};
        globalLines.push(crtBag);
      }
      if(!crtBag.type) {
        crtBag.type = line.type;
        crtBag.lines = [];
      }
      crtBag.lines.push(line);
    });
    console.log(this.lines);
  }

  selectedRouteTypeChanged(arg) {
    if(this.selectedRouteType && this.selectedRouteType.name == arg.name) return;
    this.selectedRouteType = arg;
    console.log("in RoutesTablePage selectedRouteTypeChanged: ", arg);


  }


}
