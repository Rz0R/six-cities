
import { Navigate } from 'react-router';
import { AuthorizationStatus, RoutePaths } from '../../const';

export type PrivateRouterProps = {
  authorizationStatus: AuthorizationStatus;
  authenticationPath: RoutePaths;
  element: JSX.Element;
};

function PrivateRoute({ authorizationStatus, authenticationPath, element }: PrivateRouterProps): JSX.Element {
  if (authorizationStatus === AuthorizationStatus.Auth) {
    return element;
  } else {
    return <Navigate to={{ pathname: authenticationPath }} />;
  }
}

export default PrivateRoute;
