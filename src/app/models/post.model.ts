import { User } from './user.model';

export interface Post {
  idPost: number;
  namePost: string;
  contentPost: string;
  imageUrl: string;
  createdAt: string;
  createdBy: string;
  user: User;
}
export interface CreatePost {
  namePost: string;
  contentPost: string;
  imageUrl: string;
}

export interface UpdatePost extends CreatePost {
  idPost: number;
}
