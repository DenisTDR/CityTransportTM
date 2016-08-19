/**
 * Created by tdr on 19/08/16.
 */




import {Component} from "@angular/core";
import {IONIC_DIRECTIVES, NavController} from "ionic-angular";
@Component({
  templateUrl: 'build/pages/main-map/route-details/route-details.html',
  selector: 'route-details',
  directives: [IONIC_DIRECTIVES]
})
export class RouteDetails {

  constructor(private navCtrl: NavController) {
    console.log("RouteDetails constructor");
  }
}
