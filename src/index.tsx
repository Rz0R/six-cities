import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from './services/api';
import { Provider } from 'react-redux';
import { rootReducer } from './store/root-reducer';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { requireAuthorization } from './store/actions';
import { fetchOfferAction, checkAuthAction } from './store/api-actions';
import { AuthorizationStatus } from './const';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const api = createAPI(() => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)));

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

store.dispatch(checkAuthAction());
store.dispatch(fetchOfferAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
