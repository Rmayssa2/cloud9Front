import { Post } from './post.model';

export interface Comment {
  idComment: number;
  content: string;
  dateComment: Date;
  createdAt: Date;
  post: Post;
}
