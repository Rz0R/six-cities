import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { Offer } from '../../types/offer';
import { LoadingStatus } from '../../const';

export const getCurentOffer = (state: State): Offer | null =>
  state[NameSpace.currentOffer].currentOffer;
export const getCurentOfferLoadingStatus = (state: State): LoadingStatus =>
  state[NameSpace.currentOffer].isCurrentOfferLoaded;
