import { getImageUrl } from './image-url';

it('loads Academy hotel photos and avatars through the site origin', () => {
  expect(getImageUrl('https://15.design.htmlacademy.pro/static/hotel/20.jpg'))
    .toBe('/media/hotel/20.jpg');
  expect(getImageUrl('https://15.design.htmlacademy.pro/static/avatar/1.jpg?size=small'))
    .toBe('/media/avatar/1.jpg?size=small');
});

it('preserves local assets and does not proxy unrelated hosts or API URLs', () => {
  for (const source of ['img/logo.svg', 'https://example.com/static/photo.jpg',
    'https://15.design.htmlacademy.pro.example.com/static/photo.jpg',
    'https://15.design.htmlacademy.pro/six-cities/offers']) {
    expect(getImageUrl(source)).toBe(source);
  }
});
