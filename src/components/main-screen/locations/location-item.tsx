type LocationItemProps = {
  city: string,
  selectedCity: string,
  onCiyChange: (city: string) => void,
}

function LocationItem({ city, selectedCity, onCiyChange }: LocationItemProps): JSX.Element {
  const classes = `${city === selectedCity ? 'tabs__item--active' : ''} locations__item-link tabs__item tabs`;

  const onItemClick = (evt: React.MouseEvent<HTMLLIElement>) => {
    evt.preventDefault();
    onCiyChange(city);
  };

  return (
    <li
      className="locations__item"
      onClick={onItemClick}
    >
      <a
        className={classes}
        href="/"
      >
        <span>{city}</span>
      </a>
    </li>);
}

export default LocationItem;
