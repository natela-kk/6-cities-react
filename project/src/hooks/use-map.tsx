import { MutableRefObject, useEffect, useState } from 'react';
import leaflet from 'leaflet';
import {Map} from 'leaflet';
import {Location} from '../types/offer';

const TILE_URL_TEMPLATE = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const TILE_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';


function useMap(mapRef: MutableRefObject<null>, location: Location) {
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    if (mapRef.current !== null && map === null) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: location.latitude,
          lng: location.longitude,
        },
        zoom: location.zoom,
      });

      leaflet
        .tileLayer(
          TILE_URL_TEMPLATE,
          {
            attribution: TILE_ATTRIBUTION,
          },
        )
        .addTo(instance);

      setMap(instance);
    }
  }, [mapRef, map, location]);

  return map;
}

export default useMap;
