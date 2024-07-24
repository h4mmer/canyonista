import {Geolocation, Position} from '@capacitor/geolocation';
import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  private callbackId?: string;
  private callback?: Callback;
  position: BehaviorSubject<Position | undefined> = new BehaviorSubject<Position | undefined>(undefined);

  constructor() {
  }

  register(callback: Callback) {
    this.callback = callback;
    this.activate();
  }

  activate() {
    if (this.callbackId) {
      this.deactivate()
    }
    if (this.callback) {
      Geolocation.watchPosition({enableHighAccuracy: true}, (position, err) => {
        if (err) {
          console.log(err)
        }
        if (position) {
          this.position.next(position);
          this.callback!(position);
        }
      }).then(id => {
        this.callbackId = id;
        console.log(`GPS-Callback ${this.callbackId} activated`)
      });
    }else{
      console.log("Error no GPS Callback set")
    }
  }

  deactivate() {
    if (this.callbackId) {
      Geolocation.clearWatch({
        id: this.callbackId
      })
      console.log(`GPS-Callback ${this.callbackId} deactivated`)
      this.callbackId = undefined;
    }
  }
}

export interface Callback {
  (position: Position): void;
}
