import {Injectable} from '@angular/core';
import {Control} from "ol/control";
@Injectable({
  providedIn: 'root'
})
export class CompassControl extends Control {


  constructor() {

    const button = document.createElement('button');
    button.innerHTML = 'N';

    const element = document.createElement('div');
    element.className = 'rotate-north ol-unselectable ol-control';
    element.appendChild(button);

    element.setAttribute("style", "top:80px; left:8px");
    super({
      element: element
    });

    button.addEventListener('click', this.handleRotateNorth.bind(this), false);
  }

  handleRotateNorth() {
    super.getMap()?.getView().setRotation(0);
  }

}
