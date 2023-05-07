import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreatePost, UpdatePost, Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'http://localhost:8075/post/';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl + 'all');
  }
  getPost(idPost: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}read?id=${idPost}`);
  }

  createPost(post: CreatePost, userId: number): Observable<Post> {
    return this.http.post<Post>(this.apiUrl + 'create?userid=' + userId, post);
  }

  getBestPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}sorted-by-reactions`);
  }
  searchPosts(searchTerm: string): Observable<Post[]> {
    const url = `${this.apiUrl}search?searchTerm=${searchTerm}`;
    return this.http.get<Post[]>(url);
  }
  getPostsByUser(userId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}byuser?iduser=${userId}`);
  }

  removePost(postId: number): Observable<void> {
    const url = `${this.apiUrl}remove?id=${postId}`;
    return this.http.delete<void>(url);
  }
  updatePost(post: UpdatePost): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}edit`, post);
  }
}
