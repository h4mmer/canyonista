import { Component, OnInit } from '@angular/core';
import {HydroStation} from "../model/hydro";
import {ActivatedRoute, Params, RouterLink} from "@angular/router";
import {HydroService} from "../service/hydro.service";
import {SliderComponent} from "../slider/slider.component";
import {MeteoService} from "../service/meteo.service";
import {MeteoStation} from "../model/meteo";
import {ItemComponent} from "../details/item/item.component";
import {HeaderComponent} from "../slider/header/header.component";
import {ScrollableComponent} from "../slider/scrollable/scrollable.component";

@Component({
  selector: 'app-meteo-station',
  standalone: true,
  templateUrl: './meteo-station.component.html',
  styleUrls: ['./meteo-station.component.scss'],
  imports: [
    ItemComponent,
    RouterLink,
    HeaderComponent,
    ScrollableComponent
  ]
})
export class MeteoStationComponent implements OnInit{

  id: string='';
  station?:MeteoStation;
  constructor(private route: ActivatedRoute, private _hydro:MeteoService, public slider:SliderComponent) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.station = this._hydro.getStation(this.id);
    });
  }

}
