export interface Canyon {
  id: string | null;
  ids: Record<string, string>;
  name: string;
  description?: string;

  rating?: number;
  vertical?: Verifiable<number>;
  aquatic?: Verifiable<number>;
  engagement?: Verifiable<number>;

  maxDescent?: Verifiable<number>;
  minRope?: Verifiable<number>;


  heightOfStart?: number;
  heightOfExit?: number;
  lengthInMeter?: number;

  duration?: Timespan;

  startPoint: Coordiante;
  exitPoint?: Coordiante;
  parking?: Coordiante;
  approach?: WalkingDistance;
  exit?: WalkingDistance;


  location?:Location;
}
export interface Coordiante {
  latitude: number;
  longitude: number;
}
export interface WalkingDistance extends Timespan{
  id: number | null;
  description: string;
  parking:Coordiante;
}
export interface Location{
  country:string;
  state?:string;
  region?:string;
  city?:string;
}
export interface Timespan{
  min:number;
  max?:number;
}
export interface Verifiable<T>{
  value:T;
  verified:boolean;
}
