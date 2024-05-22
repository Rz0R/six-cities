import { Cities } from '../../../const';

type LocationItemProps = {
  city: Cities;
  selectedCity: string;
  onCityChange: (city: Cities) => void;
};

function LocationItem({ city, selectedCity, onCityChange }: LocationItemProps): JSX.Element {
  const classes = `${city === selectedCity ? 'tabs__item--active' : ''} locations__item-link tabs__item tabs`;

  const onItemClick = (evt: React.MouseEvent<HTMLLIElement>) => {
    evt.preventDefault();
    onCityChange(city);
  };

  return (
    <li className="locations__item" onClick={onItemClick}>
      <a className={classes} href="/">
        <span>{city}</span>
      </a>
    </li>
  );
}

export default LocationItem;
