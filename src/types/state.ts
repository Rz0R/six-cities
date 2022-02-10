import { Cities } from '../const';
import { Offers } from './offer';

export type State = {
  selectedCity: Cities,
  offers: Offers,
};
