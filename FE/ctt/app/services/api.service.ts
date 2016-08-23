import {Injectable} from "@angular/core";
import {RouteType} from "../types/routeType.interface";
/**
 * Created by TDR on 8/20/2016.
 */
import {Http} from '@angular/http';
import {Observable} from "rxjs";

@Injectable()
export class ApiService {

  private apiServer: string = "http://transporttm.servehttp.com/";

  static get parameters(){
    return [Http];
  }
  private http: Http;
  constructor(http: Http) {
    this.http = http;
  }
  getAllStations(): void {
  }

  getStations(routeTypes: string[]) {
    return null;
  }


  getRoutes(routeType: RouteType): Observable<any>{

    var url = this.apiServer + "lines/?types=" + routeType.name;

    let response = this.http.get(url);
      // .map(res => res.text())

    return response;
  }
}
