import { useEffect, useState, MutableRefObject } from 'react';
import { Map, TileLayer } from 'leaflet';
import { City } from '../types/offer';

type useMapProps = {
  mapRef: MutableRefObject<HTMLElement | null>,
  city: City,
}

function useMap({ mapRef, city }: useMapProps) {

  const [map, setMap] = useState<Map | null>(null);
  const [currentCity, setCurrentCity] = useState<City | null>(null);

  useEffect(() => {
    if (mapRef.current && map === null) {
      const { latitude: lat, longitude: lng, zoom } = city.location;
      const instance = new Map(mapRef.current, {
        center: {
          lat,
          lng,
        },
        zoom,
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
      );

      instance.addLayer(layer);

      setMap(instance);
      setCurrentCity(city);
    } else if (mapRef.current && map && currentCity && currentCity.name !== city.name) {
      const { latitude: lat, longitude: lng, zoom } = city.location;

      map.setView([lat, lng], zoom);

      setCurrentCity(city);
    }
  }, [mapRef, map, city, currentCity]);

  return map;
}

export default useMap;
