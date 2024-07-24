import {Injectable} from '@angular/core';
import {Vector as LayerVector} from "ol/layer";
import VectorSource from "ol/source/Vector";
import {Vector as SourceVector} from "ol/source";
import {HydroStation} from "../../model/hydro";
import {Feature} from "ol";
import {Circle, Point} from "ol/geom";
import {fromLonLat} from "ol/proj";
import {Fill, Icon, Stroke, Style, Text} from "ol/style";
import ol from "ol/dist/ol";
import source = ol.source;
import {HydroService} from "../../service/hydro.service";
import {font, stroke} from "./defaults.layer";
import {interval, Subscription} from "rxjs";
import {GeolocationService} from "../../service/geolocation.service";
import {Position} from "@capacitor/geolocation";

@Injectable({
  providedIn: 'root'
})
export class GPSLayer extends LayerVector<VectorSource<any>> {
  source: SourceVector;
  location = {lat: 0, long: 0, radius: 1};
  private sub?: Subscription;

  constructor(private geo: GeolocationService) {
    const source = new SourceVector()
    super({
      source: source
    });
    this.source = source;
    //update location every minutes
    this.activate();
  }

  locate() {

  }

  activate() {
    this.geo.register(((position) => this.updateLocation(position)))
  }

  deactivate() {
    this.geo.deactivate()
  }

  updateLocation(position: Position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    const radius = position.coords.accuracy;
    this.location = {lat: lat, long: long, radius: radius};
    let coordinate = fromLonLat([long, lat]);
    this.source.clear()
    let label = new Feature({
      geometry: new Point(coordinate),
    });
    let labelText = "";
    if(position.coords.altitude){
      labelText += Math.round(position.coords.altitude);
      if(position.coords.altitudeAccuracy){
        labelText += " +-" +Math.round(position.coords.altitudeAccuracy);
      }
      labelText += " hm"
    }
    label.setStyle([new Style({
      text: new Text({
        text: labelText,
        font: font,
        fill: new Fill({
          color: 'black',
        }),
        stroke: stroke,
        offsetY: 10
      }),
    })]);
    this.source.addFeatures(
      [
        new Feature({
          geometry: new Point(coordinate),
        }),
        label,
        new Feature({
            geometry: new Circle(coordinate, radius),
          }
        )]
    )
    console.log("updated location: " + coordinate);
  }

}
