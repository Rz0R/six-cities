import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { RoutePaths } from '../../const';

function Logo(): JSX.Element {
  const { pathname } = useLocation();

  const isRootPage = pathname === RoutePaths.Root;

  return (
    <Link
      className={classNames('header__logo-link', {
        'header__logo-link--active': isRootPage,
      })}
      to="/"
    >
      <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41} />
    </Link>
  );
}

export default Logo;
