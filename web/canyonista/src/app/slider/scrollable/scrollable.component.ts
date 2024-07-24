import { Component, OnInit } from '@angular/core';
import {SliderComponent} from "../slider.component";

@Component({
  selector: 'app-scrollable',
  standalone: true,
  templateUrl: './scrollable.component.html',
  styleUrls: ['./scrollable.component.scss'],
})
export class ScrollableComponent  implements OnInit {

  constructor(public slider:SliderComponent) { }

  ngOnInit() {}

  protected readonly window = window;
}
