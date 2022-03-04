import { Navigate, useLocation } from 'react-router';
import { connect, ConnectedProps } from 'react-redux';
import { AuthorizationStatus, RoutePaths } from '../../const';
import { State } from '../../types/state';

export type PrivateRouterProps = {
  authenticationPath: RoutePaths;
  element: JSX.Element;
};

const mapStateToProps = ({ USER }: State) => ({
  authorizationStatus: USER.authorizationStatus,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & PrivateRouterProps;

function PrivateRoute({ authorizationStatus, authenticationPath, element }: ConnectedComponentProps): JSX.Element {
  const location = useLocation();

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return element;
  } else {
    return <Navigate to={{ pathname: authenticationPath }} state={{ from: location.pathname }} />;
  }
}

export { PrivateRoute };
export default connector(PrivateRoute);
