import { Cities } from '../const';

export type Id = string | null;

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type User = {
  id: string;
  name: string;
  isPro: boolean;
  avatarUrl: string;
};

export type City = {
  name: Cities;
  location: Location;
};

type Offer = {
  city: City;
  previewImage: string;
  images: string[];
  title: string;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  type: string;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: string[];
  host: User;
  description: string;
  location: Location;
  id: string;
};

export type BackendUser = {
  id: string;
  name: string;
  is_pro: boolean;
  avatar_url: string;
};

type BackendOffer = {
  city: City;
  preview_image: string;
  images: string[];
  title: string;
  is_favorite: boolean;
  is_premium: boolean;
  rating: number;
  type: string;
  bedrooms: number;
  max_adults: number;
  price: number;
  goods: string[];
  host: BackendUser;
  description: string;
  location: Location;
  id: string;
};

export type OffersData = {
  offers: Offers;
  isOffersDataLoaded: boolean;
};

export type Offers = Offer[];
export type BackendOffers = BackendOffer[];
export type { Offer, BackendOffer };
