import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { Provider } from 'react-redux';
import {store} from './store/index';
import {fetchOfferAction, checkAuthAction} from './store/api-actions';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

store.dispatch(fetchOfferAction());
store.dispatch(checkAuthAction());

ReactDOM.render(
  <Provider store={store}>
    <ToastContainer />
    <App />
  </Provider>
  ,
  document.getElementById('root'));
