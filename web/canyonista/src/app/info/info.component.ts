import { Component, OnInit } from '@angular/core';
import {HeaderComponent} from "../slider/header/header.component";
import {ScrollableComponent} from "../slider/scrollable/scrollable.component";
import {version} from "../app.component";

@Component({
  selector: 'app-info',
  standalone: true,
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  imports: [
    HeaderComponent,
    ScrollableComponent
  ]
})
export class InfoComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  protected readonly version = version;
}
