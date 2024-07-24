import { Injectable } from '@angular/core';
import {ProxyService} from "./proxy.service";
import {HydroPipe, HydroResponse, HydroStation} from "../model/hydro";
import {BehaviorSubject, firstValueFrom, interval, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HydroService {
  hydroStations:BehaviorSubject<HydroStation[]> = new BehaviorSubject<HydroStation[]>([]);
  private _hydroStations: HydroStation[]=[];
  private _pipes:HydroPipe[]=[];
  constructor(private _proxy:ProxyService) {
    _proxy.getHydroStations().subscribe(async next => this.transform(next))
    this.hydroStations.subscribe(next =>{
    this._hydroStations = next;
    console.log("recieved new Hydrostations")
    });
    _proxy.getHydroPipes().subscribe(next => this._pipes = next);
    //update every hour
    interval(360 * 1000).subscribe((val) =>
      _proxy.getHydroStations().subscribe(async next => this.transform(next))
    );
  }
  transform = (value:HydroResponse)=>{
    let stations: HydroStation[] = []
    for (let station of value.features) {
      let hydroStation: HydroStation = {
        id: station.id,
        name: station.properties.hydro_body_name,
        fullName: station.properties.name,
        unit: station.properties.unit_short,
        coordinates: station.geometry.coordinates,
        warningLevel: {1: station.properties.wl_1, 2: station.properties.wl_2, 3: station.properties.wl_3, 4: station.properties.wl_4},
        value: {
          min: station.properties.min_24h,
          max: station.properties.min_24h,
          mean: station.properties.min_24h,
          last: station.properties.min_24h,
          timestamp: station.properties.last_measured_at
        }, kind: station.properties.kind,stationId:station.properties.key
      }
      stations.push(hydroStation);
    }
    console.log(`got ${stations.length} hydro stations`)
    this.hydroStations.next(stations);
  }
  getHydroStation(id:number):HydroStation{
    return this._hydroStations.filter(station => station.id == id)[0];
  }
  getPipe(key:string):HydroPipe{
    return this._pipes.filter(station => station.key == key)[0];
  }

}

