import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import {store} from "./services/reducers";
import {history} from "./services/reducers/history";
import {getUser} from "./services/slices/user";
import {ConnectedRouter} from "connected-react-router";

// const middleware = getDefaultMiddleware({
//     immutableCheck: false,
//     serializableCheck: false,
//     thunk: true,
// });


// @ts-ignore
store.dispatch(getUser())

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <ConnectedRouter history={history}>
              <App />
          </ConnectedRouter>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
