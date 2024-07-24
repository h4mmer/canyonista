import sys
from urllib.request import Request, urlopen
from util import upload_file, save_as
from wsg import lv95_to_wsg
import json

def process(file_name):
    with open(file_name, 'r+') as f:
        data = json.load(f)
        #data['features'] = 134 # <--- add `id` value.
        f.seek(0)        # <--- should reset file position to the beginning.
        for i in range(len(data['features'])):
            data['features'][i]['geometry']['coordinates'] = lv95_to_wsg(data['features'][i]['geometry']['coordinates'])
        json.dump(data, f, indent=2)
        f.truncate()     # remove remaining part




def main() -> int:
    """Echo the input arguments to standard output"""
    req = Request("https://www.hydrodaten.admin.ch/web-hydro-maps/hydro_sensor_warn_level.geojson")
    req.add_header('Accept-Language', 'de-DE,de-CH;q=0.9,de;q=0.8,en-US;q=0.7,en;q=0.6')
    req.add_header('Host', 'www.hydrodaten.admin.ch')
    req.add_header('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36')
    req.add_header('Accept-Encoding', 'br, deflate, gzip, x-gzip')
    req.add_header('Accept', '*/*')
    contents = urlopen(req).read()
    save_as(contents, 'hydro.json')
    process('hydro.json')
    upload_file('hydro.json')
    #print(contents)
    return 0

if __name__ == '__main__':
    sys.exit(main())