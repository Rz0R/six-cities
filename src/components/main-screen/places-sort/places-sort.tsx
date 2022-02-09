import { MouseEvent, Dispatch, SetStateAction } from 'react';
import { SortTypes } from '../../../const';

type PlacesSortProps = {
  isMenuActive: boolean,
  currentSortType: SortTypes,
  sortTypesList: SortTypes[],
  onSortMenuClick: Dispatch<SetStateAction<boolean>>,
  onSortMenuItemClick: Dispatch<SetStateAction<SortTypes>>,
}

function PlacesSort({ isMenuActive, currentSortType, sortTypesList, onSortMenuClick, onSortMenuItemClick }: PlacesSortProps): JSX.Element {

  const menuClasses = `${isMenuActive ? 'places__options--opened' : ''} places__options places__options--custom`;

  const onMenuClick = (evt: MouseEvent<HTMLFormElement>) => {
    evt.stopPropagation();
    onSortMenuClick(!isMenuActive);
  };

  return (
    <form
      className="places__sorting"
      onClick={onMenuClick}
    >
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {currentSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={menuClasses}
      >
        {
          sortTypesList.map((item) => {
            const onClick = (evt: MouseEvent<HTMLLIElement>) => {
              evt.stopPropagation();
              onSortMenuItemClick(item);
              onSortMenuClick(false);
            };
            return (
              <li
                key={item}
                className={`places__option ${currentSortType === item ? 'places__option--active' : ''}`}
                tabIndex={0}
                onClick={onClick}
              >
                {item}
              </li>
            );
          })
        }
      </ul>
    </form >
  );
}

export default PlacesSort;
