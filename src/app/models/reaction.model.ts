import { User } from './user.model';
import { Post } from './post.model';

export interface Reaction {
  idReaction: number;
  user: User;
  post: Post;
  reactionType: ReactionType;
}
export interface createReaction {
  reactionType: ReactionType;
}
export enum ReactionType {
  LIKE = 'LIKE',
  LOVE = 'LOVE',
  DISLIKE = 'DISLIKE',
}
