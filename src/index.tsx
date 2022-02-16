import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createAPI } from './services/api';
import { Provider } from 'react-redux';
import { reducer } from './store/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { offers } from './mocks/offers';
import { comments } from './mocks/comments';
import { requireAuthorization } from './store/actions';
import { fetchOfferAction, checkAuthAction } from './store/api-actions';
import { AuthorizationStatus } from './const';
import { ThunkAppDispatch } from './types/actions';

const api = createAPI(() => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)));

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api))));

(store.dispatch as ThunkAppDispatch)(checkAuthAction());
(store.dispatch as ThunkAppDispatch)(fetchOfferAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        offerCardsCount={6}
        offers={offers}
        comments={comments}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
