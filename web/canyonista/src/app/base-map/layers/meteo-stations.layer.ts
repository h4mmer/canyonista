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
import {MeteoService} from "../../service/meteo.service";
import {MeteoStation} from "../../model/meteo";
import {font, stroke} from "./defaults.layer";
@Injectable({
  providedIn: 'root'
})
export class MeteoStationsLayer extends LayerVector<VectorSource<any>> {
  source:SourceVector;

  icon = new Style({
    image: new Icon({
      anchor: [0.5, 1],
      src: 'assets/meteoMarker.png',
      scale: [0.05, 0.05]
    })
  });
  constructor(private _meteo:MeteoService,) {
    const source = new SourceVector()
    super({
      source: source,
      minZoom:11
    });
    this.source = source;
    _meteo.stations.subscribe(next => this.update(next));
    this.update(_meteo.stations.getValue())
  }

  update(hydroStations:MeteoStation[]){
    //clear markers
    let features = this.source.getFeatures();
    features?.forEach(f =>this.source.removeFeature(f));

    console.log(`Meteostations: ${hydroStations.length}`)
    for(let station of hydroStations){
      let marker = new Feature({
        geometry: new Point(fromLonLat([station.longitude,station.latitude])),
        id: station.key,
        link: "/meteo"
      });
      marker.setStyle([this.icon,new Style({
        text: new Text({
          text: station.name,
          font: font,
          fill: new Fill({
            color: 'green',
          }),
          stroke: stroke,
          offsetY: -25
        }),
      }),new Style({
        text: new Text({
          text: `${station.percipitation_week_mm} mm`,
          font: font,
          fill: new Fill({
            color: 'green',
          }),
          stroke: stroke,
          offsetY: 5
        }),
      })]);
      this.source.addFeature(marker);
    }

    console.log(`meteoStation Features: ${this.source.getFeatures().length}`)
  }

}
