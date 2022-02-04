import { useRef, useEffect } from 'react';
import { Icon, Marker } from 'leaflet';
// import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';
import { URL_MARKER_DEFAULT } from '../../const';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';
import { Offers } from '../../types/offer';

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// const currentCustomIcon = new Icon({
//   iconUrl: URL_MARKER_CURRENT,
//   iconSize: [40, 40],
//   iconAnchor: [20, 40],
// });

const amsterdam = {
  name: 'Amsterdam',
  location: {
    latitude: 52.37454,
    longitude: 4.897976,
    zoom: 13,
  },
};

type MapProps = {
  offers: Offers,
}

function Map({ offers }: MapProps): JSX.Element {

  const mapRef = useRef(null);
  const map = useMap({ mapRef, city: amsterdam });

  const points = offers.filter((offer) => offer.city.name === amsterdam.name).map((offer) => offer.location);

  useEffect(() => {
    if (map) {
      points.forEach(({ latitude: lat, longitude: lng }) => {
        const marker = new Marker({
          lat,
          lng,
        });

        marker.setIcon(defaultCustomIcon).addTo(map);
      });
    }
  }, [map, points]);


  return (
    <section className="cities__map map" ref={mapRef}>
    </section>
  );
}

export default Map;
