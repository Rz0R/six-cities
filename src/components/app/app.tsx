import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainScreen from '../main-screen/main-screen';
import FavoriteScreen from '../favorites-screen/favorite-screen';
import PropertyScreen from '../property-screen/property-screen';
import LoginScreen from '../login-screen/login-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';

import { RoutePaths, AuthorizationStatus } from '../../const';
import PrivateRoute from '../private-route/private-route';

import { Offers } from '../../types/offer';
import { Comments } from '../../types/comments';

type AppScreenProps = {
  offerCardsCount: number,
  offers: Offers,
  comments: Comments,
}

function App({ offerCardsCount, offers, comments }: AppScreenProps): JSX.Element {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutePaths.Root} element={<MainScreen offerCardsCount={offerCardsCount} />} />
        <Route
          path={RoutePaths.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={AuthorizationStatus.Auth}
              authenticationPath={RoutePaths.SignIn}
              element={<FavoriteScreen offers={offers} />}
            />
          }
        />
        <Route path={`${RoutePaths.Room}/:id`} element={<PropertyScreen comments={comments} />} />
        <Route path={RoutePaths.SignIn} element={<LoginScreen />} />
        <Route path={RoutePaths.NotFound} element={<NotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
