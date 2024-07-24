import {Component, Input, OnInit} from '@angular/core';
import {Canyon} from "../model/canyon";
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import {RopePipe} from "../pipes/rope.pipe";
import {DurationPipe} from "../pipes/duration.pipe";
import {TimePipe} from "../pipes/time.pipe";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  imports: [
    IonicModule,
    CommonModule,
    RouterLink,
    RopePipe,
    DurationPipe,
    TimePipe
  ],
  standalone: true
})
export class ResultsComponent  implements OnInit {
  @Input()
  canyons: Canyon[] | null = null;

  constructor() { }

  ngOnInit() {}

}
