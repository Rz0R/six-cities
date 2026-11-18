import type { ThunkAppDispatch } from '../../types/actions';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import MainScreen from '../main-screen/main-screen';
import FavoriteScreen from '../favorites-screen/favorite-screen';
import PropertyScreen from '../property-screen/property-screen';
import LoginScreen from '../login-screen/login-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import LoadingScreen from '../loading-screen/loading-screen';

import { RoutePaths } from '../../const';
import PrivateRoute from '../private-route/private-route';

import { getOffersLoadingStatus, getOffersLoadingError } from '../../store/offers-data/selectors';

import { fetchOfferAction } from '../../store/api-actions';

function App(): JSX.Element {
  const dispatch = useDispatch<ThunkAppDispatch>();
  const hasLoadingError = useSelector(getOffersLoadingError);
  const isDataLoaded = useSelector(getOffersLoadingStatus);

  if (hasLoadingError) {
    return (
      <main className="page__main" style={{ padding: '48px', textAlign: 'center' }}>
        <h1>Could not load places</h1>
        <p>The server is unavailable. Please try again.</p>
        <button className="button" type="button" onClick={() => dispatch(fetchOfferAction())}>
          Try again
        </button>
      </main>
    );
  }

  if (!isDataLoaded) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutePaths.Root} element={<MainScreen />} />
        <Route
          path={RoutePaths.Favorites}
          element={
            <PrivateRoute authenticationPath={RoutePaths.SignIn} element={<FavoriteScreen />} />
          }
        />
        <Route path={`${RoutePaths.Room}/:id`} element={<PropertyScreen />} />
        <Route path={RoutePaths.SignIn} element={<LoginScreen />} />
        <Route path={RoutePaths.NotFound} element={<NotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
