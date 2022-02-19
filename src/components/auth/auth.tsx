import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { ThunkAppDispatch } from '../../types/actions';
import { logoutAction } from '../../store/api-actions';
import { State } from '../../types/state';
import { AuthorizationStatus, RoutePaths } from '../../const';

const mapStateToProps = ({ authorizationStatus, userData }: State) => ({
  authorizationStatus,
  userData,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onSignOut() {
    dispatch(logoutAction());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Auth({ authorizationStatus, userData, onSignOut }: PropsFromRedux): JSX.Element {
  const navigate = useNavigate();

  const signHandler = (evt: MouseEvent<HTMLLIElement>) => {
    evt.preventDefault();

    if (authorizationStatus === AuthorizationStatus.Auth) {
      onSignOut();
    } else {
      navigate(RoutePaths.SignIn);
    }
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <a
            className="header__nav-link header__nav-link--profile"
            href={userData ? RoutePaths.Favorites : RoutePaths.SignIn}
          >
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            {
              userData && <span className="header__user-name user__name">{userData.email}</span>
            }
          </a>
        </li>
        <li
          className="header__nav-item"
          onClick={signHandler}
        >
          <a className="header__nav-link" href="/">
            <span className="header__signout">{userData ? 'Sign out' : 'Sign in'}</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export { Auth };
export default connector(Auth);
