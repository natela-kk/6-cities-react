import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, AuthorizationStatus} from '../../const';

type InitialState = {
  authorizationStatus: AuthorizationStatus,
}

const initialState: InitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    requireAuthorization: (state, action) => {
      state.authorizationStatus = action.payload;
    },
  },
});

export const {requireAuthorization} = userProcess.actions;
