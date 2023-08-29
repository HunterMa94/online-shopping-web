import React from 'react';
import ReactDOM from 'react-dom/client';
import Routes from './routes';

import "resources/styles/styles.css"

import { Provider } from "react-redux"
import store from "./store"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store()}>
      <Routes />
    </Provider>
  </React.StrictMode>
);