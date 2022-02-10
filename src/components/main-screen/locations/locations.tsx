import LocationItem from './location-item';
import { citiesList } from '../../../utils/common';
import { Cities } from '../../../const';

type LocationsProps = {
  selectedCity: string,
  onCiyChange: (city: Cities) => void,
}

function Locations({ selectedCity, onCiyChange }: LocationsProps): JSX.Element {

  const locationItems = citiesList
    .map((city) => (
      <LocationItem
        key={city}
        city={city}
        selectedCity={selectedCity}
        onCityChange={onCiyChange}
      />
    ));

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {locationItems}
        </ul>
      </section>
    </div>
  );
}

export default Locations;

