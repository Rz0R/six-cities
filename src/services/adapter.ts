import { Offer, BackendOffer, BackendOffers, Offers } from '../types/offer';

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

const adaptOffersToClient = (data: BackendOffers): Offers => data.map((backendOffer) => adaptOfferToClient(backendOffer));

export { adaptOffersToClient };
