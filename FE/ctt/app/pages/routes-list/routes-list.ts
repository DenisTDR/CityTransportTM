/**
 * Created by tdr on 18/08/16.
 */


import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/routes-list/routes-list.html'
})
export class RoutesListPage {
  constructor(private navCtrl: NavController) {
    console.log("Routes constructor");
  }
}
