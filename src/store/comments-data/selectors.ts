import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { Comments } from '../../types/comments';
import { LoadingStatus, PostCommentStatus } from '../../const';

export const getComments = (state: State): Comments =>
  state[NameSpace.comments].comments;
export const getComentsLoadingStatus = (state: State): LoadingStatus =>
  state[NameSpace.comments].isCommentsLoaded;
export const getPostCommentStatus = (state: State): PostCommentStatus =>
  state[NameSpace.comments].postCommentStatus;
