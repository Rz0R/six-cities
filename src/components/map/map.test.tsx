import { render } from '@testing-library/react';
import Map from './map';
import { offers } from '../../mocks/offers';

it('replaces markers when offers or the highlighted offer change', () => {
  const city = offers[0].city;
  const { container, rerender, unmount } = render(<Map offers={offers} city={city} />);
  expect(container.querySelectorAll('.leaflet-marker-icon')).toHaveLength(offers.length);

  rerender(<Map offers={offers} city={city} activeOfferId={offers[0].id} />);
  expect(container.querySelectorAll('.leaflet-marker-icon')).toHaveLength(offers.length);

  rerender(<Map offers={[offers[0]]} city={city} />);
  expect(container.querySelectorAll('.leaflet-marker-icon')).toHaveLength(1);
  unmount();
});
