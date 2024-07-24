import {Injectable} from '@angular/core';
import {Vector as LayerVector} from "ol/layer";
import VectorSource from "ol/source/Vector";
import {Vector as SourceVector} from "ol/source";
import {HydroPipe, HydroStation} from "../../model/hydro";
import {Feature} from "ol";
import {LineString, Point} from "ol/geom";
import {fromLonLat} from "ol/proj";
import {Fill, Icon, Stroke, Style, Text} from "ol/style";
import ol from "ol/dist/ol";
import source = ol.source;
import {HydroService} from "../../service/hydro.service";
import {font, stroke} from "./defaults.layer";
import {ProxyService} from "../../service/proxy.service";
import {style} from "@angular/animations";
import {Coordinate} from "ol/coordinate";
@Injectable({
  providedIn: 'root'
})
export class HydroPipesLayer extends LayerVector<VectorSource<any>> {
  source: SourceVector;
  icon = new Style({
    image: new Icon({
      anchor: [0.5, 0.5],
      src: 'assets/floodMarker.png',
      scale: [0.05, 0.05]
    })
  });
  constructor(private _proxy:ProxyService,) {
    const source = new SourceVector()
    super({
      source: source,
      minZoom:13
    });
    this.source = source;
    _proxy.getHydroPipes().subscribe(next => this.update(next));
  }

  update(hydroStations:HydroPipe[]){
    //clear markers
    let features = this.source.getFeatures();
    features?.forEach(f =>this.source.removeFeature(f));
    console.log(`HydroPipe: ${hydroStations.length}`)
    for(let station of hydroStations){
      let start = fromLonLat([station.sink.longitude,station.sink.latitude]);
      let end = fromLonLat([station.target.longitude,station.target.latitude]);
      let marker = new Feature({
        geometry: new Point(start),
        id: station.key,
        link: "/hydropipe"
      });
      let marker2 = new Feature({
        geometry: new Point(end),
        id: station.key,
        link: "/hydropipe"
      });
      marker.setStyle([this.icon])
      marker2.setStyle([this.icon])
      this.source.addFeatures([marker,marker2]);
    }

    console.log(`Hydro pipes Features: ${this.source.getFeatures().length}`)
  }

}
