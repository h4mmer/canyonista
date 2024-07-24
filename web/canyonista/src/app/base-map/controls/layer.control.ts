import {Injectable} from '@angular/core';
import {Control} from "ol/control";
@Injectable({
  providedIn: 'root'
})
export class LayerControl  extends Control {
  visibile=1;

  constructor() {
    const button = document.createElement('button');
    button.innerHTML = '<img src="/assets/icons/layer.svg"/>';

    const element = document.createElement('div');
    element.className = 'rotate-north ol-unselectable ol-control';
    element.appendChild(button);
    element.setAttribute("style", "top:80px; right:10px");

    super({
      element: element
    });
    button.addEventListener('click', this.handleClick.bind(this), false);
  }

  handleClick() {
    let i = this.visibile ++;
    this.visibile = this.visibile %3;
    console.log(`hiding ${i} showing ${this.visibile}`)
    super.getMap()?.getLayers().item(i).setVisible(false);
    super.getMap()?.getLayers().item(this.visibile).setVisible(true);
    if(i == 0){
      super.getMap()?.getLayers().item(i).setVisible(true);
      super.getMap()?.getLayers().item(i).setMaxZoom(8);
    }
    if(this.visibile == 0){
      super.getMap()?.getLayers().item(this.visibile).setVisible(true);
      super.getMap()?.getLayers().item(this.visibile).setMaxZoom(100);
    }
  }

}
