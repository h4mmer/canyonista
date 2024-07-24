import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
  standalone: true
})
export class TimePipe implements PipeTransform {

  transform(value: number | undefined): string |undefined {
    if(value){
      let hours = Math.floor(value/60);
      let minutes = value % 60;
      return (hours>0?hours+'h':'')+(minutes>0?minutes+(hours>0?'':'min'):'')
    }
    return undefined;
  }

}
