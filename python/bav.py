import json
import sys
from urllib.request import Request, urlopen
from util import upload_file, save_as
from wsg import lv95_to_wsg
import csv

def process(file_name):
    pass




def main() -> int:
    """Echo the input arguments to standard output"""
    # https://data.geo.admin.ch/browser/#/collections/ch.bav.haltestellen-oev/items/haltestellen-oev?.language=en&.asset=asset-haltestellen-oev_2056_de.csv.zip
    file_name="./raw/haltestellen-oev_2056_de.csv/Betriebspunkt.csv"
    with open(file_name, 'r+') as f:
        file = csv.reader(f, delimiter=',', quotechar='"')
        stations = []
        i=14000
        for row in file:
            #print(row)$
            i -= 1
            if i>0 and len(row) == 19 and row[0].__contains__('ch'):

                cords = lv95_to_wsg([int(row[16]),int(row[17])])
                station = {'name': row[1],
                           'key': row[2],
                           'latitude': cords[1],
                           'longitude': cords[0],
                           'height': row[18],
                           'typ': row[9],
                           'current_url': row[12],
                           }
                stations.append(station)
        #print(stations)
    json.dump(stations, open('publicTransport.json','w'))
    #process('hydro.json')
    upload_file('publicTransport.json')
    #print(contents)
    return 0

if __name__ == '__main__':
    sys.exit(main())