import {Component, Input, OnInit, Pipe} from '@angular/core';
import {heightOptions, timeOptions} from "../picker";
import {stopPropagation} from "ol/events/Event";
import {NgForOf, NgIf} from "@angular/common";
import {IonPicker, IonPickerColumn, IonPickerColumnOption} from "@ionic/angular/standalone";
import {TimePipe} from "../../pipes/time.pipe";

@Component({
  selector: 'app-picker',
  standalone: true,
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.scss'],
  imports: [
    NgIf,
    NgForOf,
    IonPicker,
    IonPickerColumn,
    IonPickerColumnOption,
    TimePipe
  ]
})
export class PickerComponent  implements OnInit {

  @Input()
  min?:number;
  @Input()
  max?:number;
  @Input()
  title:string='';
  @Input()
  field:string='';
  @Input()
  f!:Function;
  @Input()
  context:any;
  @Input()
  options:any[]=[];
  constructor() { }

  ngOnInit() {}

    protected readonly timeOptions = timeOptions;
  protected readonly stopPropagation = stopPropagation;
  protected readonly heightOptions = heightOptions;
}
