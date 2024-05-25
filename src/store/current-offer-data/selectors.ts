import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { Offer } from '../../types/offer';
import { LoadingStatus } from '../../const';

export const getCurrentOffer = (state: State): Offer | null =>
  state[NameSpace.currentOffer].currentOffer;
export const getCurrentOfferLoadingStatus = (state: State): LoadingStatus =>
  state[NameSpace.currentOffer].isCurrentOfferLoaded;
