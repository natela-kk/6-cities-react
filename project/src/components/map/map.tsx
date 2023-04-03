import 'leaflet/dist/leaflet.css';
import { memo, useEffect, useRef } from 'react';
import { Offer, City } from '../../types/offer';
import useMap from '../../hooks/use-map';
import leaflet from 'leaflet';
import { LayerGroup } from 'leaflet';
import pin from '../../img/pin.svg';
import pinActive from '../../img/pin-active.svg';

type MapProps = {
  className: string;
  offers: Offer[];
  selectedPoint?: number | null;
  city: City;
};

function Map({ className, offers, selectedPoint, city }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city.location);
  const defaultCustomIcon = leaflet.icon({
    iconUrl: pin,
    iconSize: [27, 39],
    iconAnchor: [20, 40],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: pinActive,
    iconSize: [27, 39],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (map) {
      map.setView([
        city.location.latitude,
        city.location.longitude,
      ]);
    }
  }, [map, city]);

  useEffect(() => {
    if (map) {
      const markerGroup = new LayerGroup().addTo(map);
      const clearMarkers = () => markerGroup.clearLayers();

      offers.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: (offer.id === selectedPoint)
              ? currentCustomIcon
              : defaultCustomIcon,
          })
          .addTo(markerGroup);
      });

      return () => {
        clearMarkers();
      };
    }

  }, [city.location.latitude, city.location.longitude, currentCustomIcon, defaultCustomIcon, map, offers, selectedPoint]);

  return (
    <section className={`${className} map`}>
      <div
        style={{ height: '100%' }}
        ref={mapRef}
      >
      </div>
    </section>
  );
}

export default memo(
  Map,
  (prevProps, nextProps) =>
    prevProps.city.name === nextProps.city.name &&
    prevProps.selectedPoint === nextProps.selectedPoint,
);
