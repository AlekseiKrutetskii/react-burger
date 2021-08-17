import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';


const middleware = getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware,
    devTools: process.env.NODE_ENV !== 'production',
});

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
