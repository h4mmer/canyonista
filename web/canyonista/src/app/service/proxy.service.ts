import {Injectable} from '@angular/core';
import {Canyon} from "../model/canyon";
import {lastValueFrom, Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";
import {CoordinateResponse, HydroPipe, HydroResponse, HydroStation} from "../model/hydro";
import {HydroService} from "./hydro.service";
import ol from "ol/dist/ol";
import string = ol.string;
import {MeteoStation} from "../model/meteo";
import {PublicTransportStation} from "../model/publicTransport";
import {StorageService} from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class ProxyService {

  constructor(private http: HttpClient,private storage:StorageService) {
  }

  public getCanyons(): Observable<Canyon[]> {
    return this.get("canyons.json");
  }

  public getHydroStations(): Observable<HydroResponse> {
    return this.get("hydro.json");
  }public getHydroPipes(): Observable<HydroPipe[]> {
    return this.get("hydro_pipes.json");
  }
  public getMeteoStations(): Observable<MeteoStation[]> {
    return this.get("meteo.json");
  }
  public getPublicTransportStations(): Observable<PublicTransportStation[]> {
    return this.get("publicTransport.json");
  }

  public getCanyon(id: string): Observable<Canyon> {
    return this.getCanyons().pipe(map(canyons => canyons.filter(c => c.id == id)[0]))
  }


  public getUrl(object:string) {
    return `https://s3.eu-central-2.amazonaws.com/s3.hammer.guide/${object}`
  }

  private get<T>(object: string) {
    let res = null;
    if (object in localStorage ) {
      console.log("retrieve local copy of "+object);
      res= of(JSON.parse(localStorage.getItem(object) ?? ""));
    }
    if(res!= null && !this.timeout(object)){
      return res!;
    }
    let c: Observable<T> = this.httpGet<any>(object);
    console.log("accessing web");
    localStorage.setItem(object+'_time',(new Date()).toISOString())
    c.subscribe(value => localStorage.setItem(object, JSON.stringify(value)));
    return res ?? c;
  }
  private timeout(object:string){
    if(object+'_time' in localStorage){
      let lastDate =new Date(localStorage.getItem(object+'_time')!)
      let secondsPassed = ((new Date()).getTime()-lastDate.getTime())/1000
      return secondsPassed > 60 * 60;
    }
    return true;

  }

  private httpGet<T>(url: string) {
    console.log("calling: " + this.getUrl(url) );
    return this.http.get<T>(this.getUrl(url)+"?"+(new Date()).getTime() , {
      withCredentials: false, headers: new HttpHeaders(
        {
          'Accept': '*/*',
        })
    });
  }

  private httpPut<T>(url: string) {
    console.log("calling: " + this.getUrl(url));
    return this.http.put<T>(this.getUrl(url) , {withCredentials: true});
  }

  private httpPost<T>(url: string, body: any) {
    console.log("calling: " + this.getUrl(url) + " with: " + body);
    return this.http.post<T>(this.getUrl(url) , body, {withCredentials: true});
  }

}
