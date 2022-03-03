import { User, BackendUser } from './offer';
import { LoadingStatus, PostCommentStatus } from '../const';

type Comment = {
  id: string,
  user: User,
  rating: number,
  comment: string,
  date: string,
}

type BackendComment = {
  id: string,
  user: BackendUser,
  rating: number,
  comment: string,
  date: string,
}

type CommentsData = {
  comments: Comments,
  isCommentsLoaded: LoadingStatus,
  postCommentStatus: PostCommentStatus,
}

export type { Comment, BackendComment, CommentsData };
export type Comments = Comment[];
export type BackendComments = BackendComment[];
