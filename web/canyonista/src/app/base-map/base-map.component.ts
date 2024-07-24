import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {XYZ} from "ol/source";
import {Feature, MapBrowserEvent} from "ol";
import {Point} from "ol/geom";
import {toLonLat} from "ol/proj";
import {Router} from "@angular/router";
import {FeatureLike} from "ol/Feature";
import {Extent} from "ol/extent";
import {CompassControl} from "./controls/compass.control";
import {CopyrightControl} from "./controls/copyright.control";
import {GpsControl} from "./controls/gps.control";
import {LayerControl} from "./controls/layer.control";
import {ScaleControl} from "./controls/scale.control";
import {defaults} from "ol/control";
import {HydroStationsLayer} from "./layers/hydro-stations.layer";
import {MeteoStationsLayer} from "./layers/meteo-stations.layer";
import {CanyonMarkerLayer} from "./layers/canyon-marker.layer";
import {CanyonLabelsLayer} from "./layers/canyon-labels.layer";
import {GPSLayer} from "./layers/gps.layer";
import {CanyonDetailsLayer} from "./layers/canyon-details.layer";
import {PublicTransportStationsLayer} from "./layers/public-transport-stations.layer";
import {HydroPipesLayer} from "./layers/hydro-pipes.layer";
import {TileService} from "../service/tile.service";
@Component({
  selector: 'app-base-map',
  standalone: true,
  imports: [],
  templateUrl: './base-map.component.html',
  styleUrl: './base-map.component.scss'
})
export class BaseMapComponent implements OnInit{
  map: Map;
  osmLayer = new TileLayer({
    source: new OSM({
      tileLoadFunction:  this._tile.getSource()
    }),
    maxZoom: 8
  });
  backgroundLayer = new TileLayer({
    source: new XYZ({
      url: `https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg`,
      tileLoadFunction:  this._tile.getSource()
    }),
    minZoom: 8
  });
  backgroundLayer1 = new TileLayer({
    source: new XYZ({
      url: `https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-grau/default/current/3857/{z}/{x}/{y}.jpeg`,
      tileLoadFunction:  this._tile.getSource()
    }),
    visible:false,
    minZoom: 8
  });

  view = new View({
    projection: "EPSG:3857",
    center: [997812, 5838000],
    zoom: 10,
    maxZoom:19,
    minZoom:2,
  });

  constructor(
              private _router:Router,
              private _compass:CompassControl,
              private _copyright:CopyrightControl,
              private _gps:GpsControl,
              private _layer:LayerControl,
              private _scale:ScaleControl,
              private _canyonMarkers:CanyonMarkerLayer,
              private _canyonLabels:CanyonLabelsLayer,
              private _canyonDetails:CanyonDetailsLayer,
              private _gpsLayer:GPSLayer,
              private _hydroStationLayer:HydroStationsLayer,
              private _hydroPipeLayer:HydroPipesLayer,
              private _meteoStationLayer:MeteoStationsLayer,
              private _publicStationLayer:PublicTransportStationsLayer,
              private _tile:TileService
              ) {
    this.map = new Map();
  }

  ngOnInit(): void {
    this.map = new Map({
      controls:defaults().extend([this._compass,this._copyright,this._gps,this._layer,this._scale]),
      view: this.view,
      layers: [
          this.osmLayer,
          this.backgroundLayer,
        this.backgroundLayer1,
        this._publicStationLayer,
        this._hydroPipeLayer,
        this._hydroStationLayer,
        this._meteoStationLayer,
        this._canyonDetails,
        this._canyonMarkers,
        this._canyonLabels,
        this._gpsLayer,
      ],
      target: 'ol-map'
    });
    this.map.on('singleclick', (event: MapBrowserEvent<any>) => {
        const coordinate = event.coordinate;
        const hdms = toLonLat(coordinate);
        console.log(hdms);
        const features = this.map.getFeaturesAtPixel(event.pixel, {
          hitTolerance: 30,
          layerFilter: (layer) =>
            layer === this._canyonMarkers ||
            layer === this._hydroStationLayer ||
            layer === this._hydroPipeLayer ||
          layer === this._meteoStationLayer
      });

        if (features.length > 0) {

          this.onClick(features[0]);
        } else {
          this._router.navigate([".."]).then();
          console.log(coordinate);
          console.log(this.map.getView().getZoom())
        }
      }
    );
    let map = this.map;
    let markers = this._canyonLabels
    let contains = this.contains;
    map.on('moveend', function(e) {
      var zoom = map.getView().getZoom()!;
      var extent = map.getView().calculateExtent(map.getSize());
      var cnt = 0;
      for (var i = 0, l = markers.getSource()?.getFeatures().length??0; i < l; i++) {
        var feature = markers.getSource()?.getFeatures()![i]
        if(feature instanceof Feature && contains(extent,feature)){
          cnt++;
        }
      }
      if(cnt<20 && zoom < markers.getMinZoom()){
        markers.setMinZoom(zoom-1);
        console.log("canyons in view: "+cnt+ "zoom: "+zoom+"min:"+markers.getMinZoom());
        console.log("show labels");
      }
      if(cnt>50 && zoom > markers.getMinZoom()){
        markers.setMinZoom(zoom+1);
        console.log("canyons in view: "+cnt+ "zoom: "+zoom+"min:"+markers.getMinZoom());
        console.log("hide labels");
      }
    });
}
contains(extend:Extent,feature:Feature<any>){
    let coordinates;
    if(feature.getGeometry() instanceof Point){
      coordinates = feature.getGeometry().getCoordinates();
    }else {
      return false;
    }
    return extend[0]< coordinates[0] && extend[2] > coordinates[0]
  && extend[1]< coordinates[1] && extend[3] > coordinates[1];
}

  onClick(feature: FeatureLike) {
    let link = feature.get("link");
    let id = feature.get("id")
    this._router.navigateByUrl("/reload").then(()=>this._router.navigate([link,id]));
  }

}
