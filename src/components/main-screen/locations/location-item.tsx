type LocationItemProps = {
  city: string,
  selectedCity: string,
  onCiyChange: (city: string) => void,
}

function LocationItem({ city, selectedCity, onCiyChange }: LocationItemProps): JSX.Element {
  const classes = (value: string) => `${value === selectedCity ? 'tabs__item--active' : ''} locations__item-link tabs__item tabs`;

  const onItemClick = (evt: React.MouseEvent<HTMLLIElement>) => {
    evt.preventDefault();
    const cityName = evt.currentTarget.dataset.city || city;
    onCiyChange(cityName);
  };

  return (
    <li
      className="locations__item"
      data-city={city}
      onClick={onItemClick}
    >
      <a className={classes(city)} href="/">
        <span>{city}</span>
      </a>
    </li>);
}

export default LocationItem;
