import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SliderComponent} from "./slider/slider.component";
import {BaseMapComponent} from "./base-map/base-map.component";
import {IonicModule} from "@ionic/angular";
export const version="0.2.3b"
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SliderComponent, BaseMapComponent, IonicModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'canyonista';

  constructor() {
  }

}
