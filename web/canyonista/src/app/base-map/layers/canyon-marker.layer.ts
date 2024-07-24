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
import {AbstractCanyonLayer} from "./abstract-canyon.layer";
@Injectable({
  providedIn: 'root'
})
export class CanyonMarkerLayer extends AbstractCanyonLayer {

  constructor(_canyons:CanyonService) {
    super(_canyons);
  }
  features(canyon:Canyon){
    return [this.markerOf(canyon)];
  }
}
