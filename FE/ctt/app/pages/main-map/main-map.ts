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
  private routeDetailsVisible: boolean;
  private Globals: Globals;
  private test: string;
  @ViewChild('routeTypeMenu') routeTypeMenu : RouteTypeMenu;
  constructor(private navCtrl: NavController, private platform: Platform) {
    this.routeDetailsVisible = true;
    this.routeTypeMenuVisible = true;
    this.Globals = Globals;
    this.test = "150px";

  }
  ngOnInit () {
    console.log("ngOnInit in MainMapPage");

    let rtm = this.routeTypeMenu;
    // return;
    // setInterval(function() {
    //     rtm.setVisible(!rtm.visible);
    // }, 500);
    this.initMap();
  }
  ionViewDidEnter() {
    console.log("ionViewLoaded in MainMapPage");

  }
  initMap() {
    console.log("init map in MainMapPage!");
    let latLng = new google.maps.LatLng(45.7491624, 21.2359002);
    let mapOptions = {
      center: latLng,
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var mapElement = document.getElementById("map_canvas");

    this.map = new google.maps.Map(mapElement, mapOptions);
  }

  addMarker() {


    // let marker = new google.maps.Marker({
    //   map: this.map,
    //   animation: google.maps.Animation.DROP,
    //   position: this.map.getCenter()
    // });
    //
    // let content = "<h4>Information!</h4>";

  }

  toggleRouteTypeMenu() {
    this.routeTypeMenuVisible = !this.routeTypeMenuVisible;
  }

  selectedRouteTypeChanged(arg) {
    // this.selectedRouteType = arg;
    console.log("in MainMapPage selectedRouteTypeChanged: ", arg);

  }
}

/*
 console.log("building map!");
 var map = new GoogleMap("map_canvas");
 map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
 console.log('Map is ready!');

 });
 */
