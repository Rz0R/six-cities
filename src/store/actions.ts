import { ActionType, SelectCityAction, LoadOffersAction } from '../types/actions';
import { Offers } from '../types/offer';

export const selectCity = (city: string): SelectCityAction => ({
  type: ActionType.SelectCity,
  payload: city,
});

export const loadOffers = (offers: Offers): LoadOffersAction => ({
  type: ActionType.LoadOffers,
  payload: offers,
});
