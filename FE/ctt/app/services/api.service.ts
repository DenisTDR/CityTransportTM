import {Injectable} from "@angular/core";
import {RouteType} from "../types/routeType.interface";
/**
 * Created by TDR on 8/20/2016.
 */
import {Http} from '@angular/http';
import {Observable} from "rxjs";

@Injectable()
export class ApiService {

  static get parameters(){
    return [Http];
  }
  private http: Http;
  constructor(http) {
    this.http = http;
  }
  getAllStations(): void {
  }

  getStations(routeTypes: string[]) {
    return null;
  }


  getRoutes(routeType: RouteType){
    console.log(1);
    var url = "http://transporttm.servehttp.com/stations/?types="
      + routeType.name;
    console.log(2 + " " + url);

    this.http.get(url)
      .map(res => res.text())
      .subscribe(
        data => console.log("data"),
        err => console.log("err"),
        () => console.log('Random Quote Complete')
      );

    console.log(3);
    // return response;
  }
}
