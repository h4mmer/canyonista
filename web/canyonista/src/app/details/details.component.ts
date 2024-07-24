import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, RouterLink} from "@angular/router";
import {ProxyService} from "../service/proxy.service";
import {Canyon} from "../model/canyon";
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {DifficultyPipe} from "../pipes/difficulty.pipe";
import {DurationPipe} from "../pipes/duration.pipe";
import {RopePipe} from "../pipes/rope.pipe";
import {RatingPipe} from "../pipes/rating.pipe";
import {ItemComponent} from "./item/item.component";
import {SliderComponent} from "../slider/slider.component";
import {ScrollableComponent} from "../slider/scrollable/scrollable.component";
import {HeaderComponent} from "../slider/header/header.component";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    KeyValuePipe,
    NgIf,
    DifficultyPipe,
    DurationPipe,
    RopePipe,
    RatingPipe,
    ItemComponent,
    ScrollableComponent,
    HeaderComponent
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{
  id: string="";
  canyon?:Canyon;
  constructor(private route: ActivatedRoute, private _proxy:ProxyService, public slider:SliderComponent) {}
// code until ...
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this._proxy.getCanyon(this.id).subscribe(canyon => {
        this.canyon = canyon
        console.log(canyon.ids)
      });
    });
  }
}
