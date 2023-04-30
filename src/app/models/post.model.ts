export interface Post {
  idPost: number;
  namePost: string;
  contentPost: string;
  imageUrl: string;
  createdAt: string;
}
export interface CreatePost {
  namePost: string;
  contentPost: string;
  imageUrl: string;
}
