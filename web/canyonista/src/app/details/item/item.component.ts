import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  standalone: true
})
export class ItemComponent  implements OnInit {

  @Input()
  icon?:string;
  @Input()
  key?:string;
  @Input()
  value?:string;
  constructor() { }

  ngOnInit() {}

}
