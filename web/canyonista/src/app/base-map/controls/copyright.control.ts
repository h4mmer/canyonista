import {Injectable} from '@angular/core';
import {Control} from "ol/control";
import {SliderComponent} from "../../slider/slider.component";
@Injectable({
  providedIn: 'root'
})
export class CopyrightControl  extends Control {
  constructor() {
    const element = document.createElement('div');
    super({
      element: element
    });
    element.className = 'copyright ol-unselectable ol-control';
    element.innerHTML ='© <a href="https://www.swisstopo.admin.ch/">swisstopo</a>, <a href="https://www.openstreetmap.org/">OSM</a>';
    element.setAttribute("style", `top:${window.innerHeight-75-20}px; height: 20px; right:8px; color:black;background-color:#ffffffcc`);
  }

}
