import { Cities } from '../const';
import { Offers } from './offer';

export enum ActionType {
  SelectCity = 'main/SelectCity',
  LoadOffers = 'main/LoadOffers',
}

export type SelectCityAction = {
  type: ActionType.SelectCity,
  payload: Cities,
}

export type LoadOffersAction = {
  type: ActionType.LoadOffers,
  payload: Offers,
}

export type Actions = SelectCityAction | LoadOffersAction;
