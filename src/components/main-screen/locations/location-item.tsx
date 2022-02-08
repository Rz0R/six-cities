type LocationItemProps = {
  city: string,
  selectedCity: string,
}

function LocationItem({ city, selectedCity }: LocationItemProps): JSX.Element {
  const classes = (value: string) => `${value === selectedCity ? 'tabs__item--active' : ''} locations__item-link tabs__item tabs`;

  return (
    <li key={city} className="locations__item">
      <a className={classes(city)} href="/">
        <span>{city}</span>
      </a>
    </li>);
}

export default LocationItem;
