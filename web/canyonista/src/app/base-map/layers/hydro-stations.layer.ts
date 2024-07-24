import {Injectable} from '@angular/core';
import {Vector as LayerVector} from "ol/layer";
import VectorSource from "ol/source/Vector";
import {Vector as SourceVector} from "ol/source";
import {HydroStation} from "../../model/hydro";
import {Feature} from "ol";
import {Point} from "ol/geom";
import {fromLonLat} from "ol/proj";
import {Fill, Icon, Stroke, Style, Text} from "ol/style";
import ol from "ol/dist/ol";
import source = ol.source;
import {HydroService} from "../../service/hydro.service";
import {font, stroke} from "./defaults.layer";
@Injectable({
  providedIn: 'root'
})
export class HydroStationsLayer extends LayerVector<VectorSource<any>> {
  source:SourceVector;

  icon = new Style({
    image: new Icon({
      anchor: [0.5, 1],
      src: 'assets/hydroMarker.png',
      scale: [0.05, 0.05]
    })
  });
  constructor(private _hydro:HydroService,) {
    const source = new SourceVector()
    super({
      source: source,
      minZoom:11
    });
    this.source = source;
    _hydro.hydroStations.subscribe(next => this.update(next));
    this.update(_hydro.hydroStations.getValue())
  }

  update(hydroStations:HydroStation[]){
    //clear markers
    let features = this.source.getFeatures();
    features?.forEach(f =>this.source.removeFeature(f));
    console.log(`Hydrostations: ${hydroStations.length}`)
    for(let station of hydroStations){
      let marker = new Feature({
        geometry: new Point(fromLonLat(station.coordinates)),
        id: station.id,
        link: "/hydro"
      });
      marker.setStyle([this.icon,new Style({
        text: new Text({
          text: station.name,
          font: font,
          fill: new Fill({
            color: 'blue',
          }),
          stroke: stroke,
          offsetY: -25
        }),
      }),new Style({
        text: new Text({
          text: `${station.value.last} ${station.unit}`,
          font: font,
          fill: new Fill({
            color: 'blue',
          }),
          stroke: stroke,
          offsetY: 5
        }),
      })]);
      this.source.addFeature(marker);
    }

    console.log(`Hydrostation Features: ${this.source.getFeatures().length}`)
  }

}
