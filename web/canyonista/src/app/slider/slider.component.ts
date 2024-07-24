import { animate, state, style, transition, trigger } from '@angular/animations';
import {Component, Injectable} from '@angular/core';
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SwipeDirective} from "./swipe.directive";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {version} from "../app.component";
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [
    CommonModule,
    SwipeDirective
  ],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
  animations: [
    trigger('slideInBottom', [
      state('up',
        style({ top: '0%' ,'border-radius':'0px' })
      ),
      state('center',
        style({ top: '50%' })
      ),
      state('down',
        style({ top: `${window.innerHeight-75}px` })
      ),
      transition('up => center', [
        animate('0.5s')
      ]),
      transition('up => down', [
        animate('0.5s')
      ]),
      transition('center => up', [
        animate('0.5s')
      ]),
      transition('center => down', [
        animate('0.5s')
      ]),
      transition('down => center', [
        animate('0.5s')
      ]),
      transition('down => up', [
        animate('0.5s')
      ]),
    ])
  ],
})
export class SliderComponent {
  state:"up"|"down"|"center" = "down";
  sub:Subject<void> = new Subject();
  swipe(event:"up"|"down"|"centerUp"|"centerDown"|"fullUp"|"fullDown"){
    console.log("swipe: "+event);
    const state = this.state;
    if(state == 'up'){
      if(event == "down"){
        this.state = "center";
      }else if(event == "fullDown"){
        this.state = "down";
      }
    }else if(state == 'center'){
      if(event == "centerUp"){
        this.state = "up";
      }else if(event == "centerDown"){
        this.state = "down";
      }
    }else{
      if(event == "up"){
        this.state = "center";
      }else if(event == "fullUp"){
        this.state = "up";
      }
    }
    this.sub.next();
  }
  toggle() {
    switch(this.state){
      case "down":
        this.state = "center";
        break;
      case "center":
        this.state = "up";
        break;
      case "up":
        this.state = "down";
    }
    this.sub.next();
  }

  protected readonly version = version;
}
