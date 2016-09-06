import {Component} from '@angular/core';
import {HomePage} from '../home/home';
import {AboutPage} from '../about/about';
import {ContactPage} from '../contact/contact';
import {RoutesListPage} from '../routes-list/routes-list';
import {MainMapPage} from "../main-map/main-map";
import {RoutesTablePage} from "../routes-table/routes-table";
import {RouteStationsPage} from "../route-stations/route-stations";

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private routesTablePage: any;
  private mainMapPageTab: any;
  private routeStations: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.routesTablePage = RoutesTablePage;
    this.mainMapPageTab = MainMapPage;
    this.routeStations = RouteStationsPage;
  }
}
