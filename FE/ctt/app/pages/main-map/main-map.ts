/**
 * Created by tdr on 19/08/16.
 */


import {Component, ViewChild} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {RouteDetails} from "./route-details/route-details";
import {RouteTypeMenu} from "../route-type-menu/route-type-menu";
import {Globals} from "../globals";


@Component({
  templateUrl: 'build/pages/main-map/main-map.html',
  directives: [RouteDetails, RouteTypeMenu]
})
export class MainMapPage {
  private map: any;
  private routeTypeMenuVisible: boolean;
  private Globals: Globals;
  private test: string;
  @ViewChild('routeTypeMenu') routeTypeMenu : RouteTypeMenu;
  constructor(private navCtrl: NavController, private platform: Platform) {
    this.routeTypeMenuVisible = true;
    this.Globals = Globals;
    this.test = "150px";

  }
  ngOnInit () {
    console.log("ngOnInit in MainMapPage");

    this.routeTypeMenu.someProp = "b";
    let rtm = this.routeTypeMenu;
    // return;
    // setInterval(function() {
    //     rtm.setVisible(!rtm.visible);
    // }, 500);
  }
  ionViewDidEnter() {
    console.log("ionViewLoaded in MainMapPage");
    // this.initMap();

  }
  initMap() {
    console.log("init map in MainMapPage!");
    let latLng = new google.maps.LatLng(-34.9290, 138.6010);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var mapElement = document.getElementById("map_canvas");

    this.map = new google.maps.Map(mapElement, mapOptions);
  }

  addMarker() {
    this.routeTypeMenu.setVisible(!this.routeTypeMenu.visible);

    // let marker = new google.maps.Marker({
    //   map: this.map,
    //   animation: google.maps.Animation.DROP,
    //   position: this.map.getCenter()
    // });
    //
    // let content = "<h4>Information!</h4>";

  }

  selectedRouteTypeChanged(arg) {
    // this.selectedRouteType = arg;
    console.log("in MainMapPage selectedRouteTypeChanged: ", arg);

  }

  routeTypeMenuViewChanged(routeTypeMenu: RouteTypeMenu) {
    if(!routeTypeMenu.visible) {
      this.test = '150px';
    }
    else {
      this.test = '0';
    }
  }
}

/*
 console.log("building map!");
 var map = new GoogleMap("map_canvas");
 map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
 console.log('Map is ready!');

 });
 */
