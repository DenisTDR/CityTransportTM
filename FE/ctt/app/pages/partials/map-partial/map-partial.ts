import {IONIC_DIRECTIVES, NavController} from "ionic-angular";
import {Component} from "@angular/core";
/**
 * Created by tdr on 29/08/16.
 */

@Component({
  templateUrl: 'build/pages/partials/map-partial/map-partial.html',
  selector: 'map-partial',
  directives: [IONIC_DIRECTIVES]
})
export class MapPartial {

  constructor(private navCtrl: NavController) {
    console.log("MapPartialComponent constructor");
  }

}
