export interface HydroPipe{
  name:string,
  key:string,
  sink:{latitude:number,longitude:number,height:number},
  target:{latitude:number,longitude:number,height:number},
  body:string,
  type:string,
  naturalFlow:number[],
  withdraw:number[],
  residual:number[],
}

export interface HydroStation {
  name:string,
  fullName:string,
  id:number,
  stationId:string,
  coordinates: number[],
  unit:string,

  value: HydroMeasurement,
  kind:string,
  warningLevel:{
    1:string,
    2:string,
    3:string,
    4:string,
  }
}
export interface HydroMeasurement{
  min:string,
  max:string,
  mean:string,
  last:string,
  timestamp:string,
}

export interface CoordinateResponse{
  easting:number,
  northing:number
}

export interface HydroResponse {
  features: {
    id:number,
    geometry: {
      type: string,
      coordinates: number[]
    },
    properties: {
      label: string,
      key: string,
      icon: string,
      icon_path: string,
      hydro_body: string,
      hydro_body_name: string,
      last_value: string,
      metric: string,
      unit: string,
      unit_short: string,
      plot: string,
      last_measured_at: string,
      min_24h: string,
      max_24h: string,
      mean_24h: string,
      failure_text: null,
      failure_valid_from: null,
      sensor_discharge_measured_at: string,
      sensor_discharge_min_24h: string,
      sensor_discharge_max_24h: string,
      sensor_discharge_mean_24h: string,
      sensor_discharge_last_value: string,
      sensor_waterlevel_measured_at: string,
      sensor_waterlevel_min_24h: string,
      sensor_waterlevel_max_24h: string,
      sensor_waterlevel_mean_24h: string,
      sensor_waterlevel_last_value: string,
      wl_1: string,
      wl_2: string,
      wl_3: string,
      wl_4: string,
      threshold_customer: null,
      kind: string,
      name: string,
      hydro_station_id: number
    }
  }[]
}
