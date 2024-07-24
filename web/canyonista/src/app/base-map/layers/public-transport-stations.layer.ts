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
import {ProxyService} from "../../service/proxy.service";
import {PublicTransportStation} from "../../model/publicTransport";
@Injectable({
  providedIn: 'root'
})
export class PublicTransportStationsLayer extends LayerVector<VectorSource<any>> {
  source:SourceVector;

  icon = new Style({
    image: new Icon({
      anchor: [0.5, 1],
      src: 'assets/publicTransportMarker.png',
      scale: [0.05, 0.05]
    })
  });
  constructor(private _proxy:ProxyService,) {
    const source = new SourceVector()
    super({
      source: source,
      minZoom:14
    });
    this.source = source;
    _proxy.getPublicTransportStations().subscribe(next => this.update(next));
  }

  update(hydroStations:PublicTransportStation[]){
    //clear markers
    let features = this.source.getFeatures();
    features?.forEach(f =>this.source.removeFeature(f));

    console.log(`PublicTransportStations: ${hydroStations.length}`)
    for(let station of hydroStations){
      let marker = new Feature({
        geometry: new Point(fromLonLat([station.longitude,station.latitude])),
        id: station.key,
        link: "/publicTransport"
      });
      marker.setStyle([this.icon]);
      this.source.addFeature(marker);
    }

    console.log(`meteoStation Features: ${this.source.getFeatures().length}`)
  }

}
