import { Component, OnInit } from '@angular/core';
import {Canyon} from "../model/canyon";
import {ActivatedRoute, Params, RouterLink} from "@angular/router";
import {ProxyService} from "../service/proxy.service";
import {SliderComponent} from "../slider/slider.component";
import {HydroService} from "../service/hydro.service";
import {HydroStation} from "../model/hydro";
import {DifficultyPipe} from "../pipes/difficulty.pipe";
import {DurationPipe} from "../pipes/duration.pipe";
import {ItemComponent} from "../details/item/item.component";
import {NgIf} from "@angular/common";
import {RopePipe} from "../pipes/rope.pipe";
import {HeaderComponent} from "../slider/header/header.component";
import {ScrollableComponent} from "../slider/scrollable/scrollable.component";

@Component({
  selector: 'app-hydro-station',
  standalone: true,
  imports: [
    RouterLink,
    DifficultyPipe,
    DurationPipe,
    ItemComponent,
    NgIf,
    RopePipe,
    HeaderComponent,
    ScrollableComponent
  ],
  templateUrl: './hydro-station.component.html',
  styleUrls: ['./hydro-station.component.scss'],
})
export class HydroStationComponent  implements OnInit {

  id: number=0;
  station?:HydroStation;
  constructor(private route: ActivatedRoute, private _hydro:HydroService, public slider:SliderComponent) {}
// code until ...
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.station = this._hydro.getHydroStation(this.id);
    });
  }

}
