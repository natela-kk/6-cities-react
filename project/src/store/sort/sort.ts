import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, SORT_TYPE} from '../../const';

type InitialState = {
  sortType: string,
}

const initialState: InitialState = {
  sortType: SORT_TYPE.popular,
};

export const sort = createSlice({
  name: NameSpace.Sort,
  initialState,
  reducers: {
    changeSortTypeAction: (state, action) => {
      state.sortType = action.payload;
    },
  },
});

export const {changeSortTypeAction} = sort.actions;
