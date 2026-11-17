const IMAGE_ORIGIN = 'https://15.design.htmlacademy.pro';

export const getImageUrl = (source: string): string => {
  try {
    const url = new URL(source);
    if (url.origin === IMAGE_ORIGIN && url.pathname.startsWith('/static/')) {
      return `/media/${url.pathname.slice('/static/'.length)}${url.search}`;
    }
  } catch {
    // Local assets already load from the site's own origin.
  }
  return source;
};
