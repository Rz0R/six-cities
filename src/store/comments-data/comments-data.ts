import { CommentsData } from '../../types/comments';
import { LoadingStatus, PostCommentStatus } from '../../const';
import { Actions, ActionType } from '../../types/actions';

const initialState: CommentsData = {
  comments: [],
  isCommentsLoaded: LoadingStatus.Idle,
  postCommentStatus: PostCommentStatus.Idle,
};

export const commentsData = (state = initialState, action: Actions): CommentsData => {
  switch (action.type) {
    case ActionType.LoadComments:
      return {
        ...state,
        comments: action.payload,
        isCommentsLoaded: LoadingStatus.Success,

      };
    case ActionType.RemoveCommentsData:
      return {
        ...state,
        comments: [],
        isCommentsLoaded: LoadingStatus.Idle,
      };
    case ActionType.SetCommentsDataNotFoundStatus:
      return {
        ...state,
        comments: [],
        isCommentsLoaded: LoadingStatus.NotFound,
      };
    default:
      return state;
  }
};
