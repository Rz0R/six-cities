import { Offer } from './offer';
import { LoadingStatus } from '../const';

export type CurrentOfferData = {
  currentOffer: Offer | null;
  isCurrentOfferLoaded: LoadingStatus;
};
