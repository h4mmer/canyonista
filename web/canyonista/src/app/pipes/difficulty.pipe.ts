import { Pipe, PipeTransform } from '@angular/core';
import {Canyon} from "../model/canyon";

@Pipe({
  name: 'difficulty',
  standalone: true
})
export class DifficultyPipe implements PipeTransform {

  transform(canyon: Canyon|undefined): string {
    return this.a(canyon)+this.v(canyon)+this.e(canyon)
  }
  v(canyon: Canyon|undefined): string {
    const value = canyon?.vertical?.value ;
    const verfied = canyon?.vertical?.verified;
    if(! value)
      return '';
    return 'v'+value+(verfied?'':'?');
  }
  a(canyon: Canyon|undefined): string {
    const value = canyon?.aquatic?.value ;
    const verfied = canyon?.aquatic?.verified;
    if(! value)
      return '';
    return 'v'+value +(verfied?'':'?');
  }
  e(canyon: Canyon|undefined): string {
    const value = canyon?.engagement?.value ;
    const verfied = canyon?.engagement?.verified;
    if(! value)
      return '';
    let v;
    switch (value){
      case 1: v=   'I';break;
      case 2: v=  'II';break;
      case 3: v= 'III';break;
      case 4: v=  'IV';break;
      case 5: v=   'V';break;
      case 6: v=  'VI';break;
      case 7: v= 'VII';break;
      case 8: v='VIII';break;
      default: v= 'e'+v;break;
    }
    return v +(verfied?'':'?');
  }
}
