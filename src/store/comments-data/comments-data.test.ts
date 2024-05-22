import { LoadingStatus, PostCommentStatus } from '../../const';
import { commentsData, initialState } from './comments-data';
import {
  loadComments,
  removeCommentsData,
  setCommentsDataNotFoundStatus,
  setPostCommentStatus,
} from '../actions';
import { comments } from '../../mocks/comments';

describe('Reducer: commentsData', () => {
  it('without additional parameters should return initial state', () => {
    expect(commentsData(void 0, { type: 'UNKNOWN_TYPE' })).toEqual(initialState);
  });

  it('should update state if comments are loaded', () => {
    expect(commentsData(initialState, loadComments(comments))).toEqual({
      ...initialState,
      comments,
      isCommentsLoaded: LoadingStatus.Success,
    });
  });

  it('should remove comments data', () => {
    const state = {
      ...initialState,
      comments,
      isCommentsLoaded: LoadingStatus.Success,
    };
    expect(commentsData(state, removeCommentsData)).toEqual(initialState);
  });

  it('should set not found status', () => {
    const state = {
      ...initialState,
      comments,
      isCommentsLoaded: LoadingStatus.Success,
    };
    expect(commentsData(state, setCommentsDataNotFoundStatus)).toEqual({
      ...state,
      comments: [],
      isCommentsLoaded: LoadingStatus.NotFound,
    });
  });

  it('should set postComment status to Succes', () => {
    expect(commentsData(initialState, setPostCommentStatus(PostCommentStatus.Success))).toEqual({
      ...initialState,
      postCommentStatus: PostCommentStatus.Success,
    });
  });
});
