import { useRef, useEffect } from 'react';
import { Icon, Marker } from 'leaflet';
import { Cities, URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';
import { Offers, Id } from '../../types/offer';

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const citiesLocations = [
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13,
    },
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13,
    },
  },
  {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13,
    },
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13,
    },
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13,
    },
  },

];


type MapProps = {
  offers: Offers,
  selectedCity?: Cities,
  activeOfferId?: Id,
}

function Map({ offers, selectedCity, activeOfferId }: MapProps): JSX.Element {

  let currentCity = citiesLocations.find((item) => item.name === selectedCity);

  if (!currentCity) {
    currentCity = {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13,
      },
    };
  }

  const mapRef = useRef(null);
  const map = useMap({ mapRef, city: currentCity });

  const filteredOffers = offers.filter((offer) => offer.city.name === selectedCity);

  useEffect(() => {
    if (map) {
      filteredOffers.forEach((offer) => {
        const { latitude: lat, longitude: lng } = offer.location;
        const marker = new Marker({
          lat,
          lng,
        });

        const icon = activeOfferId === offer.id ? currentCustomIcon : defaultCustomIcon;

        marker.setIcon(icon).addTo(map);
      });
    }
  }, [map, filteredOffers, activeOfferId]);

  return (
    <div style={{ height: '100%' }} ref={mapRef}>
    </div>
  );
}

export default Map;
