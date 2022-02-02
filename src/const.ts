export const STARS_NUMBER = 5;

export enum RoutePaths {
  Root = '/',
  SignIn = '/login',
  Favorites = '/favorites',
  Room = '/offer',
  NotFound = '*'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum Container {
  Main = 'Main',
  Favorites = 'Favorites',
  Properties = 'Properties',
}

export enum RatingNames {
  terribly,
  badly,
  notBad,
  good,
  perfect,
}
