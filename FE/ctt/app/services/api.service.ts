import {Injectable} from "@angular/core";
import {RouteType} from "../types/routeType.interface";
import {Observable} from 'rxjs/Rx';
/**
 * Created by TDR on 8/20/2016.
 */
import {Http} from '@angular/http';
import {Route} from "../types/route.interface";
import {Station} from "../types/station.interface";
import {Globals} from "../pages/globals";
import {Line} from "../types/line.interface";

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

  private mockLines: Line[];
  getLinesMock(): Observable<Line[]>{
    var observable = Observable.create(function(observer) {
      setTimeout(function(){
        if(!this.mockLines)
          this.mockLines = getMockLines();
        observer.next(this.mockLines);
      }, 1000);
    });

    return observable;
  }

  getLine(id: string): Observable<Line> {
    console.log("get line din api service")
    var observable = Observable.create(function(observer){
      setTimeout(function(){
        if(!this.mockLines)
          this.mockLines = getMockLines();
       for(var i=0;i<this.mockLines.length;i++){
           if(this.mockLines[i].id==id){
             observer.next(this.mockLines[i]);
             return;
           }
        }
      }, 500);
    });
    return observable;
  }


}



var getMockLines = function(): Line[] {
  var sts = [];
  for(var i = 0; i < 100; i++) {
    sts[i] = {
      id: i + 1 + "",
      name: "Statia " + i,
      rawName: "statia_" + i,
      junction: "primele_statii"
    };
  }
  var lines = [];
  var routesCount = randomInt(40, 100);

  var groupBy = routesCount/Globals.routeTypes.length;
  for(var i = 0; i < routesCount; i++) {
    var thisRouteStationsCount = randomInt(15, 25);
    var r1 = {id: "r" + (2*i), stations: []};
    var r2 = {id: "r" + (2*i+1), stations: []};
    for(var j = 0; j < thisRouteStationsCount; j ++) {
      var st = sts[randomInt(0, sts.length)];
      r1.stations.push(st);
      r2.stations.splice(0, 0, st);
    }
    var l = {
      id: "l" + i,
      name: "Linia " + (i + 1),
      number: i + 1,
      routes: [r1, r2],
      type: Globals.routeTypes[Math.floor(i/groupBy)]
    };
    lines.push(l);
  }
  return lines;
};
var randomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};
