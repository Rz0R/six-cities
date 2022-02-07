import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './store/reducer';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { offers } from './mocks/offers';
import { comments } from './mocks/comments';

const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        offerCardsCount={6}
        offers={offers}
        comments={comments}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
