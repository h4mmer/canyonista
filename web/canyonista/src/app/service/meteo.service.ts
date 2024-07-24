import { Injectable } from '@angular/core';
import {BehaviorSubject, interval} from "rxjs";
import {HydroResponse, HydroStation} from "../model/hydro";
import {ProxyService} from "./proxy.service";
import {MeteoStation} from "../model/meteo";

@Injectable({
  providedIn: 'root'
})
export class MeteoService {
  stations:BehaviorSubject<MeteoStation[]> = new BehaviorSubject<MeteoStation[]>([]);
  constructor(private _proxy:ProxyService) {
    _proxy.getMeteoStations().subscribe(async next => this.receive(next))
    //update every hour
    interval(360 * 1000).subscribe((val) =>
      _proxy.getMeteoStations().subscribe(async next => this.receive(next))
    );
  }
  receive = (value:MeteoStation[])=>{
    console.log(`got ${value.length} hydro stations`)
    this.stations.next(value);
  }
  getStation(key:string):MeteoStation{
    let station = this.stations.getValue().filter(station => station.key == key)[0];
    station.current.date = station.current.date.substring(6,8)+"."+station.current.date.substring(4,6)+"."+station.current.date.substring(0,4)
    return this.stations.getValue().filter(station => station.key == key)[0];
  }
}
