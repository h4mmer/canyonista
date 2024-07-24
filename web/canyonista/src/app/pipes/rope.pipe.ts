import { Pipe, PipeTransform } from '@angular/core';
import {Canyon} from "../model/canyon";

@Pipe({
  name: 'rope',
  standalone: true
})
export class RopePipe implements PipeTransform {

  transform(canyon: Canyon|undefined): string {
    const value = canyon?.minRope?.value ?? canyon?.maxDescent?.value;
    const verfied = canyon?.minRope?.verified;
    if(! value)
      return '';
    return value + "m"+(verfied?'':'?');
  }

}
