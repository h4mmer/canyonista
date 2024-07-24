import {Injectable} from '@angular/core';
import {Control, ScaleLine} from "ol/control";
@Injectable({
  providedIn: 'root'
})
export class ScaleControl  extends ScaleLine {


  constructor() {

    super({
      units: 'metric',
      minWidth: 75,
    }
    );
    this.element.setAttribute("style",`top:${window.innerHeight-75-20}px; height: 20px`)
  }

}
