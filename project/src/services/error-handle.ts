import request from 'axios';
import {toast} from 'react-toastify';
import {ErrorType} from '../types/error';
import {AppRoute, HttpCode } from '../const';
import { redirectToRoute } from '../store/action';
import { store } from '../store';

export const errorHandle = (error: ErrorType): void => {
  if (!request.isAxiosError(error)) {
    throw error;
  }
  const {response} = error;

  if (response) {
    switch (response.status) {
      case HttpCode.BadRequest :
        toast.info(response.data.error);
        break;
      case HttpCode.Unauthorized :
        toast.info('Make sure you\'re logged in');
        break;
      case HttpCode.NotFound :
        toast.info(response.data.error);
        store.dispatch(redirectToRoute(AppRoute.Error));
        break;
      default:
        toast.info(`Unknown error: ${response.data.error}`);
    }
  } else {
    toast.info('Something went wrong');
  }
};
