import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createAPI } from './services/api';
import { Provider } from 'react-redux';
import { rootReducer } from './store/root-reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { requireAuthorization } from './store/actions';
import { fetchOfferAction, checkAuthAction } from './store/api-actions';
import { AuthorizationStatus } from './const';
import { ThunkAppDispatch } from './types/actions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const api = createAPI(() => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)));

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api))));

(store.dispatch as ThunkAppDispatch)(checkAuthAction());
(store.dispatch as ThunkAppDispatch)(fetchOfferAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App
        offerCardsCount={6}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
