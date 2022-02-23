import { User, BackendUser } from './offer';

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

export type { Comment, BackendComment };
export type Comments = Comment[];
export type BackendComments = BackendComment[];
