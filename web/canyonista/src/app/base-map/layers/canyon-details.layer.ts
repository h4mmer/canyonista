import {Injectable} from '@angular/core';
import {Feature} from "ol";
import {Point} from "ol/geom";
import {fromLonLat} from "ol/proj";
import {Fill, Icon, Stroke, Style, Text} from "ol/style";
import {CanyonService} from "../../service/canyon.service";
import {Canyon} from "../../model/canyon";
import {AbstractCanyonLayer} from "./abstract-canyon.layer";
@Injectable({
  providedIn: 'root'
})
export class CanyonDetailsLayer extends AbstractCanyonLayer {
  constructor(_canyons:CanyonService) {
    super(_canyons);
    this.setMinZoom(14);
  }
  features(canyon:Canyon){
    let markers:Feature<Point>[] = [];
    if(canyon.exitPoint){
      let marker = this.markerOf(canyon);
      marker.setGeometry(new Point(fromLonLat([canyon.exitPoint.longitude, canyon.exitPoint.latitude])))
      marker.setStyle([new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: 'assets/exitMarker.png',
          scale: [0.05, 0.05]
        })
      })]);
      markers.push(marker)
    }
    if(canyon.exit && canyon.exit?.parking){
      let marker = this.markerOf(canyon);
      marker.setGeometry(new Point(fromLonLat([canyon.exit.parking.longitude, canyon.exit.parking.latitude])))
      marker.setStyle([new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: 'assets/parkingMarker.png',
          scale: [0.05, 0.05]
        })
      })]);
      markers.push(marker)
    }
    if(canyon.approach && canyon.approach?.parking){
      let marker = this.markerOf(canyon);
      marker.setGeometry(new Point(fromLonLat([canyon.approach.parking.longitude, canyon.approach.parking.latitude])))
      marker.setStyle([new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: 'assets/parkingMarker.png',
          scale: [0.05, 0.05]
        })
      })]);
      markers.push(marker)
    }
    return markers;
  }
}
