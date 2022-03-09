import { Navigate, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { AuthorizationStatus, RoutePaths } from '../../const';
import { getAuthorizationStatus } from '../../store/user-state/selectors';

export type PrivateRouterProps = {
  authenticationPath: RoutePaths;
  element: JSX.Element;
};

function PrivateRoute({ authenticationPath, element }: PrivateRouterProps): JSX.Element {
  const location = useLocation();

  const authorizationStatus = useSelector(getAuthorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return element;
  } else {
    return <Navigate to={{ pathname: authenticationPath }} state={{ from: location.pathname }} />;
  }
}

export default PrivateRoute;
