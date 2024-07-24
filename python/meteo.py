import json
import sys
from pathlib import Path
from urllib.request import Request, urlopen
from util import upload_file, save_as
import csv


def get_stations():
    req = Request("https://data.geo.admin.ch/ch.meteoschweiz.klima/nbcn-tageswerte/liste-download-nbcn-d.csv")

    contents = urlopen(req).read()
    save_as(contents, 'meteo/stations.csv')
    with open('meteo/stations.csv', 'r+',encoding="ISO-8859-1") as f:
        spamreader = csv.reader(f, delimiter=';', quotechar='|')
        stations = []
        for row in spamreader:
            if len(row) == 13 and row[12].__contains__('https://'):
                station = {'name': row[0],
                           'key': row[1],
                           'latitude': row[7],
                           'longitude': row[8],
                           'height': row[4],
                           'previous_url': row[11],
                           'current_url': row[12],
                           }
                stations.append(station)
        print(stations)
        return stations


# https://www.meteoschweiz.admin.ch/service-und-publikationen/applikationen/messwerte-und-messnetze.html#param=messwerte-niederschlag-24h&station=ALT&lang=de&chart=day&table=false


def get_data(station):
    file_name = f'meteo/{station["key"]}_current.csv'
    contents = urlopen(station['current_url']).read()
    save_as(contents, file_name)
    with open(file_name, 'r+') as f:
        reader = csv.reader(f, delimiter=';', quotechar='|')
        data = []
        # Parameter            Einheit          Beschreibung
        # gre000d0             W/m²             Globalstrahlung; Tagesmittel
        # hto000d0             cm               Gesamtschneehöhe; Morgenmessung von 6 UTC
        # nto000d0             %                Gesamtbewölkung; Tagesmittel
        # prestad0             hPa              Luftdruck auf Stationshöhe (QFE); Tagesmittel
        # rre150d0             mm               Niederschlag; Tagessumme 6 UTC - 6 UTC Folgetag
        # sre000d0             min              Sonnenscheindauer; Tagessumme
        # tre200d0             °C               Lufttemperatur 2 m über Boden; Tagesmittel
        # tre200dn             °C               Lufttemperatur 2 m über Boden; Tagesminimum
        # tre200dx             °C               Lufttemperatur 2 m über Boden; Tagesmaximum
        # ure200d0             %                Relative Luftfeuchtigkeit 2 m über Boden; Tagesmittel
        for row in reader:
            if row[0] == station['key']:
                d = {'date': row[1],
                     'radiation_avg_W/m2': row[2],
                     'snow_6am_cm': row[3],
                     'cloud_avg_%': row[4],
                     'preasure_avg_hPa': row[5],
                     'percipitation_day_mm': row[6],
                     'sunshine_min': row[7],
                     'temperature_avg_c': row[8],
                     'temperature_min_c': row[9],
                     'temperature_max_c': row[10],
                     'humidity_avg_%': row[11]
                     }
                data.append(d)
        return data


def main() -> int:
    Path("meteo").mkdir(parents=True, exist_ok=True)
    """Echo the input arguments to standard output"""
    stations = get_stations()
    for station in stations:
        station['data'] = get_data(station)
        station['current'] = station['data'][-1]
        try:
            station['percipitation_week_mm'] = list(map(lambda x: x['percipitation_day_mm'], station['data'][-8:-1]))
            station['percipitation_week_mm'] = sum([float(i) for i in station['percipitation_week_mm']])
            station['percipitation_week_mm'] = f'{station['percipitation_week_mm']:.0f}'
        except ValueError:
            pass
    print(stations)
    with open("meteo.json", "w") as file:
        json.dump(stations, file, indent=2)
    upload_file('meteo.json')
    # print(contents)
    return 0


if __name__ == '__main__':
    sys.exit(main())
