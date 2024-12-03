import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import {Provider} from "react-redux";
import {setStore} from "./store/store";
const store = setStore()

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
  </React.StrictMode>
);

