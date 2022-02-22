import { useRef, useEffect } from 'react';
import { Marker } from 'leaflet';
import { DEFAULT_CUSTOM_ICON, CURRENT_CUSTOM_ICON } from '../../const';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';
import { Offers, Id, City } from '../../types/offer';

type MapProps = {
  offers: Offers,
  city: City,
  activeOfferId?: Id,
}

function Map({ offers, activeOfferId, city }: MapProps): JSX.Element {

  const mapRef = useRef(null);
  const map = useMap({ mapRef, city });

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const { latitude: lat, longitude: lng } = offer.location;
        const marker = new Marker({
          lat,
          lng,
        });

        const icon = activeOfferId === offer.id ? CURRENT_CUSTOM_ICON : DEFAULT_CUSTOM_ICON;

        marker.setIcon(icon).addTo(map);
      });
    }
  }, [map, offers, activeOfferId]);

  return (
    <div style={{ height: '100%' }} ref={mapRef}>
    </div>
  );
}

export default Map;
