import {NavController} from "ionic-angular";
import {Component} from "@angular/core";
import {ApiService} from "../../services/api.service";
import {Line} from "../../types/line.interface";
import {LinesBag} from "../../types/linesBag.interface";
import {RouteType} from "../../types/routeType.interface";
import {RouteTypeMenu} from "../route-type-menu/route-type-menu";
/**
 * Created by NM on 9/7/2016.
 */

@Component({
  templateUrl: 'build/pages/lines-table/lines-table.html',
  providers: [ApiService],
  directives: [RouteTypeMenu]
})
export class LinesTablePage {
  private loading: boolean = false;
  private lines: Line[];
  private linesBags: LinesBag[];

  constructor(private navCtrl: NavController, private apiService: ApiService) {
    console.log("LinesTablePage constructor");
    // this.routeTypeMenu = RouteTypeMenu;

  }

  ngOnInit() {
    this.loading = true;
    this.apiService.getLinesMock().subscribe(
      data => {
        this.gotLines(data);
      }
    )
  }

  ionViewWillEnter() {
  }

  ionViewDidEnter() {
  }

  gotLines(lines: Line[]) {
    var tmpLines: Line[] = [];
    var tmpLinesBags: LinesBag[] = [];

    var tmpDict = {};

    lines.forEach(function(line) {
      if(typeof tmpDict[line.type.name] == 'undefined'){
        tmpDict[line.type.name] = tmpLinesBags.length;
        tmpLinesBags.push({type: line.type, lines: []});
      }
      tmpLinesBags[tmpDict[line.type.name]].lines.push(line);
      tmpLines.push(line);
    });
    this.lines = tmpLines;
    this.linesBags = tmpLinesBags;
    console.log("got lines bags", this.linesBags);
    this.loading = false;
  }

  selectedRouteTypeChanged(arg) {
    console.log("in LinesTablePage selectedRouteTypeChanged: ", arg);
  }
}
