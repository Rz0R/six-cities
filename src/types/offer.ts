export type Location = {
  latitude: number,
  longitude: number,
  zoom: number,
}

type Host = {
  id: string,
  name: string,
  isPro: boolean,
  avatarUrl: string,
}

export type City = {
  name: string
  location: Location
}

type Offer = {
  city: City,
  previewImage: string,
  images: string[],
  title: string,
  isFavorite: boolean,
  isPremium: boolean,
  rating: number,
  type: string,
  bedrooms: number,
  maxAdults: number,
  price: number,
  goods: string[],
  host: Host,
  description: string,
  location: Location,
  id: string
}

export type Offers = Offer[];
export type { Offer };
