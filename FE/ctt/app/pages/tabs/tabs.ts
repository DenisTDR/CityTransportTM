import {Component} from '@angular/core';
import {HomePage} from '../home/home';
import {AboutPage} from '../about/about';
import {ContactPage} from '../contact/contact';
import {RoutesListPage} from '../routes-list/routes-list';
import {MainMapPage} from "../main-map/main-map";

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private routesListPage: any;
  private mainMapPageTab: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.routesListPage = RoutesListPage;
    this.mainMapPageTab = MainMapPage;
  }
}
