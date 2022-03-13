import { CommentsData } from '../../types/comments';
import { LoadingStatus, PostCommentStatus } from '../../const';
import { createReducer } from '@reduxjs/toolkit';
import { loadComments, removeCommentsData, setCommentsDataNotFoundStatus, setPostCommentStatus } from '../actions';

export const initialState: CommentsData = {
  comments: [],
  isCommentsLoaded: LoadingStatus.Idle,
  postCommentStatus: PostCommentStatus.Idle,
};

export const commentsData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
      state.isCommentsLoaded = LoadingStatus.Success;
    })
    .addCase(removeCommentsData, (state) => {
      state.comments = [];
      state.isCommentsLoaded = LoadingStatus.Idle;
    })
    .addCase(setCommentsDataNotFoundStatus, (state) => {
      state.comments = [];
      state.isCommentsLoaded = LoadingStatus.NotFound;
    })
    .addCase(setPostCommentStatus, (state, action) => {
      state.postCommentStatus = action.payload;
    });
});
