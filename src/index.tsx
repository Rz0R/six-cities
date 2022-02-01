import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { offers } from './mocks/offers';
import { comments } from './mocks/comments';

ReactDOM.render(
  <React.StrictMode>
    <App
      offerCardsCount={6}
      offers={offers}
      comments={comments}
    />
  </React.StrictMode>,
  document.getElementById('root'));
