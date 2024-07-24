import {Injectable} from '@angular/core';
import {Control} from "ol/control";
import {GPSLayer} from "../layers/gps.layer";
import View from "ol/View";
import {fromLonLat} from "ol/proj";
import {GeolocationService} from "../../service/geolocation.service";

@Injectable({
  providedIn: 'root'
})
export class GpsControl extends Control {

  constructor(private _gps: GeolocationService) {

    const button = document.createElement('button');
    button.innerHTML = '<img src="/assets/icons/radius.svg"/>';

    const element = document.createElement('div');
    element.className = 'rotate-north ol-unselectable ol-control';

    element.setAttribute("style", "top:45px; right:8px");
    element.appendChild(button);

    super({
      element: element
    });

    button.addEventListener('click', this.handleClick.bind(this), false);
  }

  handleClick() {
    if (this._gps.position.value) {
      this.getMap()?.getView().setCenter(fromLonLat([this._gps.position.value?.coords.longitude, this._gps.position.value?.coords.latitude]));
      console.log(`current height: ${this._gps.position.value?.coords.altitude} +- ${this._gps.position.value?.coords.altitudeAccuracy} hm `)
    } else {
      console.log("current Position is undefined")
    }
  }

}
