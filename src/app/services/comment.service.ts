import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment.model';
interface commentCreate {
  content: string;
}
@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private baseUrl = 'http://localhost:8075/comment';

  constructor(private http: HttpClient) {}

  createComment(
    commentRequest: commentCreate,
    postId: number,
    userid: number
  ): Observable<Comment> {
    return this.http.post<Comment>(
      `${this.baseUrl}/create/${postId}?userid=${userid}`,
      commentRequest
    );
  }

  editComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.baseUrl}/edit`, comment);
  }

  getCommentById(id: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.baseUrl}/read?id=${id}`);
  }

  getAllComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseUrl}/all`);
  }

  removeComment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/remove?id=${id}`);
  }

  getCommentsByUser(userId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseUrl}/byuser?iduser=${userId}`);
  }

  getCommentsByPost(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseUrl}/bypost?post_id=${postId}`);
  }
}
