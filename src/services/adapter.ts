import { Offer, BackendOffer, BackendOffers, Offers } from '../types/offer';
import { BackendUser, UserData } from '../types/user-data';

const adaptOfferToClient = (backendOffer: BackendOffer): Offer => {
  const adaptedOffer = {
    ...backendOffer,
    id: backendOffer.id.toString(),
    previewImage: backendOffer.preview_image,
    isFavorite: backendOffer.is_premium,
    isPremium: backendOffer.is_premium,
    maxAdults: backendOffer.max_adults,
    host: {
      ...backendOffer.host,
      isPro: backendOffer.host.is_pro,
      avatarUrl: backendOffer.host.avatar_url,
    },
  };

  Reflect.deleteProperty(adaptedOffer, 'preview_image');
  Reflect.deleteProperty(adaptedOffer, 'is_favorite');
  Reflect.deleteProperty(adaptedOffer, 'is_premium');
  Reflect.deleteProperty(adaptedOffer, 'max_adults');
  Reflect.deleteProperty(adaptedOffer.host, 'is_pro');
  Reflect.deleteProperty(adaptedOffer.host, 'avatar_url');

  return adaptedOffer;
};

const adaptUserDataToClient = (backendUserData: BackendUser): UserData => {
  const adaptedUserData = {
    ...backendUserData,
    avatarUrl: backendUserData.avatar_url,
    isPro: backendUserData.is_pro,
  };

  Reflect.deleteProperty(adaptedUserData, 'avatar_url');
  Reflect.deleteProperty(adaptedUserData, 'is_pro');

  return adaptedUserData;
};

const adaptOffersToClient = (data: BackendOffers): Offers => data.map((backendOffer) => adaptOfferToClient(backendOffer));

export { adaptOffersToClient, adaptUserDataToClient };
