const STARS_NUMBER = 5;

export const getRatingStyle = (rating: number) => ({ width: `${100 / STARS_NUMBER * rating}%` });
