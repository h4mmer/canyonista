export interface MeteoStation{
  'name': string,
  'key': string,
  'latitude': number,
  'longitude': number,
  'height': number,
  'previous_url': string,
  'current_url': string,
  percipitation_week_mm:number,
  current:{'date': string,
    'radiation_avg_W/m2': number,
    'snow_6am_cm': number,
    'cloud_avg_%': number,
    'preasure_avg_hPa': number,
    'percipitation_day_mm': number,
    'sunshine_min': number,
    'temperature_avg_c': number,
    'temperature_min_c': number,
    'temperature_max_c': number,
    'humidity_avg_%': number
  }
}
