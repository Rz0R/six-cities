import { useRef, useEffect } from 'react';
import { Marker } from 'leaflet';
import { DEFAULT_CUSTOM_ICON, CURRENT_CUSTOM_ICON, CITY_LOCATIONS } from '../../const';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';
import { Offers, Id } from '../../types/offer';
import { State } from '../../types/state';
import { connect, ConnectedProps } from 'react-redux';

type MapProps = {
  offers: Offers,
  activeOfferId?: Id,
}

const mapStateToProps = ({ selectedCity }: State) => ({
  selectedCity: selectedCity,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & MapProps;

function Map({ offers, activeOfferId, selectedCity }: ConnectedComponentProps): JSX.Element {

  const currentCity = (CITY_LOCATIONS.find((city) => city.name === selectedCity)) || CITY_LOCATIONS[0];

  const mapRef = useRef(null);
  const map = useMap({ mapRef, city: currentCity });

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

export { Map };
export default connector(Map);
