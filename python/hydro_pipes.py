import sys
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen
from util import upload_file, save_as
from wsg_lv03 import lv95_to_wsg
import json
import csv


def process(file_name):
    pass


def main() -> int:
    """Echo the input arguments to standard output"""
    # https://data.geo.admin.ch/browser/#/collections/ch.bfe.statistik-wasserkraftanlagen/items/statistik-wasserkraftanlagen?.language=en&.asset=asset-statistik-wasserkraftanlagen_2056.csv.zip
    # https://www.bafu.admin.ch/bafu/de/home/themen/wasser/zustand/daten/restwasserkarte--datenabfrage-zu-wasserentnahmen-und--rueckgaben.html
    # https://www.bafu-daten.ch/wasser/restwasser/data/data/index/rawData_d.txt
    file_name = "./raw/Wasser_entnamen.txt"
    with open(file_name, 'r+') as f:
        file = csv.reader(f, delimiter='\t', quotechar='"')
        stations = []
        for row in file:
            #print(row)
            if len(row) == 52 and not row[0].__contains__('Restwasserkarte'):
                cords = lv95_to_wsg([int(row[2]), int(row[3])])
                try:
                    cords = lv95_to_wsg([int(row[50]), int(row[51])])
                except ValueError:
                    pass
                station = {'name': row[1],
                           'key': row[1],
                           'sink': {'latitude': cords[1],
                                    'longitude': cords[0],
                                    'height': row[4]},
                           'target': {'latitude': cords[1],
                                      'longitude': cords[0]},
                           'body': row[5],
                           'typ': row[6],
                           'naturalFlow': [row[13],
                                           row[14],
                                           row[15],
                                           row[16],
                                           row[17],
                                           row[18],
                                           row[19],
                                           row[20],
                                           row[21],
                                           row[22],
                                           row[23],
                                           row[24]],
                           'withdraw': [row[25],
                                        row[26],
                                        row[27],
                                        row[28],
                                        row[29],
                                        row[30],
                                        row[31],
                                        row[32],
                                        row[33],
                                        row[34],
                                        row[35],
                                        row[36]],
                           'residual': [row[37],
                                        row[38],
                                        row[39],
                                        row[40],
                                        row[41],
                                        row[42],
                                        row[43],
                                        row[44],
                                        row[45],
                                        row[46],
                                        row[47],
                                        row[48]],
                           }
                try:
                    station['naturalFlow'] = [float(x) for x in station['naturalFlow']]
                except ValueError:
                    station['naturalFlow'] = None
                try:
                    station['withdraw'] = [float(x) for x in station['withdraw']]
                except ValueError:
                    station['withdraw'] = None
                try:
                    station['residual'] = [float(x)/1000 for x in station['residual']]
                except ValueError:
                    station['residual'] = None
                stations.append(station)
        print(stations)
    json.dump(stations, open('hydro_pipes.json', 'w'))
    upload_file('hydro_pipes.json')
    ## print(contents)
    return 0


if __name__ == '__main__':
    sys.exit(main())
