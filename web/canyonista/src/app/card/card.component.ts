import {booleanAttribute, Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";
import {stopPropagation} from "ol/events/Event";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input({transform: booleanAttribute})
  disabled=false;

  protected readonly stopPropagation = stopPropagation;
}
