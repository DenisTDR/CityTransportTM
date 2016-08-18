import {Component} from '@angular/core';
import {HomePage} from '../home/home';
import {AboutPage} from '../about/about';
import {ContactPage} from '../contact/contact';
import {RoutesListPage} from '../routes-list/routes-list';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private routesListPage: any;
  private homePageTab: any;
  private aboutPageTab: any;
  private contactPageTab: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.routesListPage = RoutesListPage;
    this.homePageTab = HomePage;
    this.aboutPageTab = AboutPage;
    this.contactPageTab = ContactPage;
  }
}
