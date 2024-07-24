import { Injectable } from '@angular/core';
import {ProxyService} from "./proxy.service";
import {Canyon} from "../model/canyon";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CanyonService {

  canyons: Canyon[] = [];
  filteredCanyons:BehaviorSubject<Canyon[]> = new BehaviorSubject<Canyon[]>([]);

  constructor(private _proxy:ProxyService) {
    this._proxy.getCanyons().subscribe(value => {
      this.canyons = value;
      this.filteredCanyons.next(this.canyons);
      console.log("got "+this.canyons.length+" canyons");
    });
  }
  set(canyons:Canyon[]){
    this.filteredCanyons.next(canyons);
  }

}
