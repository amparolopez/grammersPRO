import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import mainReducers from './redux/reducers/mainReducers';
import { createStore, applyMiddleware } from 'redux';

const reduxStore = createStore(mainReducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={reduxStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);
