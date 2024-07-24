import { Pipe, PipeTransform } from '@angular/core';
import {Canyon} from "../model/canyon";

@Pipe({
  name: 'rating',
  standalone: true
})
export class RatingPipe implements PipeTransform {

  transform(canyon: Canyon|undefined): string {
    const value = canyon?.rating;
    if(! value)
      return '';
    return value + "*";
  }

}
