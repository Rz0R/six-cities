import { STARS_NUMBER } from '../const';

export const getRatingStyle = (rating: number) => ({ width: `${100 / STARS_NUMBER * rating}%` });

export const ratingValues = Array.from({ length: STARS_NUMBER }, (_, i) => i + 1).sort((a, b) => b - a);
