import { citiesList } from '../../../utils/common';

type LocationsProps = {
  selectedCity: string,
}

function Locations({ selectedCity }: LocationsProps): JSX.Element {
  const classes = (value: string) => `${value === selectedCity ? 'tabs__item--active' : ''} locations__item-link tabs__item tabs`;

  const locationItems = citiesList.map((city) => (
    <li key={city} className="locations__item">
      <a className={classes(city)} href="/">
        <span>{city}</span>
      </a>
    </li>));

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

