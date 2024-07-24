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
import {CanyonService} from "../../service/canyon.service";
import {Canyon} from "../../model/canyon";
@Injectable({
  providedIn: 'root'
})
export abstract class AbstractCanyonLayer extends LayerVector<VectorSource<any>> {
  source:SourceVector;

  icon = new Style({
    image: new Icon({
      anchor: [0.5, 1],
      src: 'assets/marker.png',
      scale: [0.05, 0.05]
    })
  });
  protected constructor(private _canyons:CanyonService) {
    const source = new SourceVector()
    super({
      source: source
    });
    this.source = source;
    _canyons.filteredCanyons.subscribe(next => this.update(next));
    this.update(_canyons.filteredCanyons.getValue())
  }
  update(canyons:Canyon[]){
    //clear markers
    let features = this.source.getFeatures();
    features?.forEach(f =>this.source.removeFeature(f));
    //populate view
    for (let canyon of canyons) {
      let feature = this.features(canyon);
      if(feature)
       this.source.addFeatures(feature);
    }
  }
  abstract features(canyon:Canyon):Feature<Point>[] | undefined;
  markerOf(cayon:Canyon){
    let marker = new Feature({
      geometry: new Point(fromLonLat([cayon.startPoint.longitude, cayon.startPoint.latitude])),
      id: cayon.id,
      link: "/detail"
    });
    marker.setStyle([this.icon]);
    return marker;
  }
  labelOf(canyon:Canyon){
    let marker = this.markerOf(canyon);
    marker.setStyle([new Style({
      text: new Text({
        text: canyon.name,
        font: font,
        fill: new Fill({
          color: 'black',
        }),
        stroke: stroke,
        offsetY: 5
      }),
    })])
    return marker;
  }
}
