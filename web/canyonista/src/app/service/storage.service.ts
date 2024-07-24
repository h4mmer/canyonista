import { Injectable } from '@angular/core';
import {Filesystem,Encoding,Directory} from "@capacitor/filesystem";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private root="canyonista/"
  private dir = Directory.Library
  constructor() {
  }
  private sanitise(key:string){
    const removeReg = new RegExp("https?://","g");
    return key.replaceAll(removeReg,"")
      .replaceAll("/",".")
  }
  async write(key:string, value:string){
    await Filesystem.writeFile({
      path: this.root+this.sanitise(key),
      data: value,
      directory: this.dir,
      encoding: Encoding.UTF8,
    });
  }
  async read(key:string):Promise<string|null>{
    try{
    const data = (await Filesystem.readFile({
      path: this.root+this.sanitise(key),
      directory: this.dir,
      encoding: Encoding.UTF8,
    })).data;
    return String(data);
  } catch(Error){
    return null;
  }
  }
}
