import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { offers } from './mocks/offers';

ReactDOM.render(
  <React.StrictMode>
    <App
      offerCardsCount={6}
      offers={offers}
    />
  </React.StrictMode>,
  document.getElementById('root'));
