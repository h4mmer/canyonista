import {Injectable, OnChanges, SimpleChanges} from '@angular/core';
import {Canyon} from "../model/canyon";
import {CanyonService} from "../service/canyon.service";


export interface minMax {
  min?:number;
  max?:number;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService implements OnChanges{
  active: boolean = true;
  time:minMax = {};
  rope:minMax = {};
  height:minMax = {};
  distance:minMax = {};
  travel?: string;
  search:string='';
  constructor(private _canyons:CanyonService){}
  public filter(){
    const value = this.search;
    let canyons = this._filter(this._canyons.canyons)
    console.log(canyons.length +" after attr filter")
    if (value != ''){
      const filterValue = value.toLowerCase();
      canyons = canyons.filter(canyon => {
        return canyon.name.toLowerCase().includes(filterValue)
          || (canyon.location?.country?.toLowerCase() ?? '').includes(filterValue)
          || (canyon.location?.state?.toLowerCase() ?? '').includes(filterValue)
          || (canyon.location?.region?.toLowerCase() ?? '').includes(filterValue)
          || (canyon.location?.city?.toLowerCase() ?? '').includes(filterValue)
      });

      console.log(canyons.length +" after str filter")
    }
    this._canyons.set(canyons);
  }
  private _filter(canyons:Canyon[]):Canyon[]{
    return canyons.filter(canyon => {
      let rope = canyon.minRope?.value ?? canyon.maxDescent?.value;
      let height = canyon.maxDescent?.value ?? canyon.minRope?.value;
      return !this.active ||
        (!this.time.min || canyon.duration?.min && canyon.duration?.min! >= this.time.min)
        && (!this.time.max || canyon.duration?.max && canyon.duration?.max! <= this.time.max)
        && (!this.rope.min || rope && rope >= this.rope.min)
        && (!this.rope.max || rope && rope <= this.rope.max)
        && (!this.height.min || height && height >= this.height.min)
        && (!this.height.max || height && height <= this.height.max)
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("Update Filter")
    this.filter();
  }
}
