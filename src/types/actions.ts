import { Cities } from '../const';
import { Offers } from './offer';
import {
  selectCity,
  loadOffers,
  requireAuthorization,
  requireLogout,

} from '../store/actions'

export enum ActionType {
  SelectCity = 'main/SelectCity',
  LoadOffers = 'main/LoadOffers',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
}

export type Actions =
  | ReturnType<typeof selectCity>
  | ReturnType<typeof loadOffers>
  | ReturnType<typeof requireAuthorization>
  | ReturnType<typeof requireLogout>;
