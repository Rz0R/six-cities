import { configureStore } from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../../services/api';
import { rootReducer, NameSpace } from '../root-reducer';
import { fetchOfferAction, checkAuthAction } from '../api-actions';
import { offers } from '../../mocks/offers';
import { AuthorizationStatus } from '../../const';

function setup() {
  const api = createAPI(() => undefined);
  const mock = new MockAdapter(api);
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: { extraArgument: api } }),
  });
  return { store, mock };
}

it('leaves loading on network failure and can retry successfully', async () => {
  const { store, mock } = setup();
  mock.onGet('/offers').networkError();
  await store.dispatch(fetchOfferAction());
  expect(store.getState()[NameSpace.offers].hasOffersLoadingError).toBe(true);

  mock.onGet('/offers').reply(200, offers);
  const retry = store.dispatch(fetchOfferAction());
  expect(store.getState()[NameSpace.offers].hasOffersLoadingError).toBe(false);
  await retry;
  expect(store.getState()[NameSpace.offers]).toEqual({
    offers,
    isOffersDataLoaded: true,
    hasOffersLoadingError: false,
  });
  mock.restore();
});

it('resolves guest authorization even when the auth request fails', async () => {
  const { store, mock } = setup();
  mock.onGet('/login').networkError();
  await store.dispatch(checkAuthAction());
  expect(store.getState()[NameSpace.user].authorizationStatus).toBe(AuthorizationStatus.NoAuth);
  mock.restore();
});
