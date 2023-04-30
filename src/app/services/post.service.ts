import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreatePost, Post } from '../models/post.model';

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

  createPost(post: CreatePost): Observable<Post> {
    return this.http.post<Post>(this.apiUrl + 'create?userid=1', post);
  }

  updatePost(post: Post): Observable<Post> {
    const url = `${this.apiUrl}/${post.idPost}`;
    return this.http.put<Post>(url, post);
  }

  deletePost(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  getBestPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}sorted-by-reactions`);
  }
  searchPosts(searchTerm: string): Observable<Post[]> {
    const url = `${this.apiUrl}search?searchTerm=${searchTerm}`;
    return this.http.get<Post[]>(url);
  }
}