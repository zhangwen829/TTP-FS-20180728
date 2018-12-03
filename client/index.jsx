import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import stores from './stores';

ReactDOM.render(
  <Provider store={stores}>
    <BrowserRouter><App /></BrowserRouter>
  </Provider>,
  document.getElementById('app')
);