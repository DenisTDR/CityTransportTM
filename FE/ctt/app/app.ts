import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar, GoogleMap} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  private rootPage: any;
  private map: any;

  constructor(private platform: Platform) {
    this.rootPage = TabsPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      console.log("platform ready !!!!!");
    });
    // var GOOGLE = new plugin.google.maps.LatLng(37.422858, -122.085065);
    // var map = plugin.google.maps.Map.getMap(mapDiv);
    // map.addEventListener(plugin.google.maps.event.MAP_READY, function() {
    //   map.setCenter(GOOGLE);
    // });
  }

}

ionicBootstrap(MyApp);
