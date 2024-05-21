import { address } from 'faker';
import { appState, initialState } from './app-state';
import { selectCity } from '../actions';
import { Cities } from '../../const';

describe('Reducer: appState', () => {
  it('without additional parameters should return initial state', () => {
    expect(appState(void 0, { type: 'UNKNOWN_ACTION' })).toEqual(initialState);
  });

  it('should change city by a given value', () => {
    const anotherCity = address.cityName() as Cities;
    expect(appState(initialState, selectCity(anotherCity))).toEqual({
      selectedCity: anotherCity,
    });
  });
});
