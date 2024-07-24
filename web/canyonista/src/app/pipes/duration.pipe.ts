import { Pipe, PipeTransform } from '@angular/core';
import {Canyon, Timespan} from "../model/canyon";
import {TimePipe} from "./time.pipe";

@Pipe({
  name: 'duration',
  standalone: true
})
export class DurationPipe implements PipeTransform {
  transform(timespan: Timespan|undefined): string {
    const time = new TimePipe();
    const min = this.round(timespan?.min ?? timespan?.max);
    const max = this.round(timespan?.max);
    if(min ){
      if(max && min < max){
        return  time.transform(min) +'-'+time.transform(max);
      }else {
        return  time.transform(min) +'+';
      }
    }else {
      if(max){
        return  '~'+time.transform(max);
      }else {
        return  '?h';
      }
    }
  }
  minuteValues= [10,15,20,30,45,60,90,120,180,240,300,360,480,600,720,1440,2880]
  round(v?:number, dir:"up"="up"):number|undefined{
    if(!v){
      return undefined;
    }else{
      if(dir == "up"){
        for (let i =0; i<this.minuteValues.length; i++){
          if(this.minuteValues[i]>=v)
            return this.minuteValues[i];
        }
      }
    }
    return undefined;
  }
}
