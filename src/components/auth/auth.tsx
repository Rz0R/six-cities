import { MouseEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutAction } from '../../store/api-actions';
import { AuthorizationStatus, RoutePaths } from '../../const';
import {
  getUserData,
  getAuthorizationStatus,
} from '../../store/user-state/selectors';

function Auth(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authorizationStatus = useSelector(getAuthorizationStatus);
  const userData = useSelector(getUserData);

  const signHandler = (evt: MouseEvent<HTMLLIElement>) => {
    evt.preventDefault();

    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(logoutAction());
    } else {
      navigate(RoutePaths.SignIn);
    }
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link
            className="header__nav-link header__nav-link--profile"
            to={userData ? RoutePaths.Favorites : RoutePaths.SignIn}
          >
            <div className="header__avatar-wrapper user__avatar-wrapper"></div>
            {userData && (
              <span className="header__user-name user__name">
                {userData.email}
              </span>
            )}
          </Link>
        </li>
        <li className="header__nav-item" onClick={signHandler}>
          <Link className="header__nav-link" to={RoutePaths.Root}>
            <span className="header__signout">
              {userData ? 'Sign out' : 'Sign in'}
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Auth;
