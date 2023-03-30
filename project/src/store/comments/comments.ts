import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import { Comment } from '../../types/comment';

type InitialState = {
  comments: Comment[],
}

const initialState: InitialState = {
  comments: [],
};

export const comments = createSlice({
  name: NameSpace.Comments,
  initialState,
  reducers: {
    loadCommentsAction: (state, action) => {
      state.comments = action.payload;
    },
    postCommentAction: (state, action) => {
      state.comments = action.payload;
    },
  },
});

export const {loadCommentsAction, postCommentAction} = comments.actions;
