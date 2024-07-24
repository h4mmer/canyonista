import {
  Component
} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AsyncPipe, KeyValuePipe, NgClass, NgForOf, NgIf, NgTemplateOutlet, Time} from '@angular/common';
import {CardComponent} from "../card/card.component";
import {ResultsComponent} from "../results/results.component";
import {Canyon} from "../model/canyon";
import {stopPropagation} from "ol/events/Event";
import {TimePipe} from "../pipes/time.pipe";
import {distanceOptions, heightOptions, timeOptions} from "./picker";

import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonPicker,
  IonPickerColumn,
  IonPickerColumnOption, IonRouterLinkWithHref
} from "@ionic/angular/standalone";

import {minMax, SearchService} from "./search.service";
import {CanyonService} from "../service/canyon.service";
import {PickerComponent} from "./picker/picker.component";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule,
    AsyncPipe,
    CardComponent,
    ResultsComponent,
    NgTemplateOutlet,
    NgClass,
    KeyValuePipe,
    NgIf,
    TimePipe,
    IonIcon,
    IonInput,
    IonItem,
    IonPicker,
    ReactiveFormsModule,
    IonPickerColumnOption,
    NgForOf,
    IonPickerColumn,
    IonButton,
    PickerComponent,
    IonRouterLinkWithHref,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  canyons: Canyon[] = [];
  selected: number = 0;
  showResults: boolean=false;

  focusSearch(){
    this.showResults = true;
  }
  clearSearch(){
    this.showResults = false;
    this.search.search = "";
    this.search.filter();
  }

  constructor(public search: SearchService, canyons:CanyonService) {
    canyons.filteredCanyons.subscribe(next => this.canyons = next);
  }

  select(i: number) {
    this.selected=i;
  }

  stopPropagation(event: any){
    stopPropagation(event);
  }

  onIonChange(event: CustomEvent,type : 'min' | 'max', field: 'time' | 'height' | 'rope') {
    let parent: minMax | string = this.search[field];
    switch (type){
      case "min":
        parent.min = event.detail.value;
        break;
      case "max":
        parent.max = event.detail.value;
        break;
    }
    this.search.filter()
  }
  protected readonly time:TimePipe=new TimePipe();
  protected readonly timeOptions = timeOptions;
  protected readonly heightOptions = heightOptions;
  protected readonly distanceOptions = distanceOptions;

  clearFilter() {
    this.search.time = {}
    this.search.rope = {}
    this.search.height = {}
    this.search.filter()
  }
}
