import {createSlice} from '@reduxjs/toolkit';
import {CITIES, NameSpace} from '../../const';
import { City } from '../../types/offer';

type InitialState ={
  city: City,
}

const initialState: InitialState = {
  city: CITIES[0],
};

export const city = createSlice({
  name: NameSpace.City,
  initialState,
  reducers: {
    changeCityAction: (state, action) => {
      state.city = action.payload;
    },
  },
});

export const {changeCityAction} = city.actions;
