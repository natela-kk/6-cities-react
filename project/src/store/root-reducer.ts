import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { city } from './city/city';
import { comments } from './comments/comments';
import { offers } from './offers/offers';
import { sort } from './sort/sort';
import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.City]: city.reducer,
  [NameSpace.Comments]: comments.reducer,
  [NameSpace.Offers]: offers.reducer,
  [NameSpace.Sort]: sort.reducer,
});
