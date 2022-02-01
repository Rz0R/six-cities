type User = {
  id: string,
  isPro: boolean,
  name: string,
  avatarUrl: string,
}

type Comment = {
  id: string,
  user: User,
  rating: number,
  comment: string,
  date: string,
}

export type { Comment };
export type Comments = Comment[];
