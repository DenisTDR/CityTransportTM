import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';


@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  // private platform: Platform;
  constructor(private navCtrl: NavController, private platform: Platform) {
  }


}
