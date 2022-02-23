import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

import MainScreen from '../main-screen/main-screen';
import FavoriteScreen from '../favorites-screen/favorite-screen';
import PropertyScreen from '../property-screen/property-screen';
import LoginScreen from '../login-screen/login-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import LoadingScreen from '../loading-screen/loading-screen';

import { RoutePaths } from '../../const';
import { State } from '../../types/state';
import PrivateRoute from '../private-route/private-route';

type AppScreenProps = {
  offerCardsCount: number,
}

const mapStateToProps = ({ isDataLoaded }: State) => ({ isDataLoaded });

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = AppScreenProps & PropsFromRedux;

function App({ offerCardsCount, isDataLoaded }: ConnectedComponentProps): JSX.Element {

  if (!isDataLoaded) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutePaths.Root} element={<MainScreen offerCardsCount={offerCardsCount} />} />
        <Route
          path={RoutePaths.Favorites}
          element={
            <PrivateRoute
              authenticationPath={RoutePaths.SignIn}
              element={<FavoriteScreen />}
            />
          }
        />
        <Route path={`${RoutePaths.Room}/:id`} element={<PropertyScreen />} />
        <Route path={RoutePaths.SignIn} element={<LoginScreen />} />
        <Route path={RoutePaths.NotFound} element={<NotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export { App };
export default connector(App);
