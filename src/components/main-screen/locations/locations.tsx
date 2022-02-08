import LocationItem from './location-item';
import { citiesList } from '../../../utils/common';

type LocationsProps = {
  selectedCity: string,
  onCiyChange: (city: string) => void,
}

function Locations({ selectedCity, onCiyChange }: LocationsProps): JSX.Element {

  const locationItems = citiesList
    .map((city) => (
      <LocationItem
        key={city}
        city={city}
        selectedCity={selectedCity}
        onCiyChange={onCiyChange}
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

