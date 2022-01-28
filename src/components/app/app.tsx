import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainScreen from '../main-screen/main-screen';
import FavoriteScreen from '../favorites-screen/favorite-screen';
import PropertyScreen from '../property-screen/property-screen';
import LoginScreen from '../login-screen/login-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';

import { LinkRoutes } from '../../const';

type AppScreenProps = {
  offerCardsCount: number
}

function App({ offerCardsCount }: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={LinkRoutes.Root} element={<MainScreen offerCardsCount={offerCardsCount} />} />
        <Route path={LinkRoutes.Favorites} element={<FavoriteScreen />} />
        <Route path={LinkRoutes.Room} element={<PropertyScreen />} />
        <Route path={LinkRoutes.SignIn} element={<LoginScreen />} />
        <Route path={LinkRoutes.NotFound} element={<NotFoundScreen />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
