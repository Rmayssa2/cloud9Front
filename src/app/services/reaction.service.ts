import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reaction, createReaction } from '../models/reaction.model';

@Injectable({
  providedIn: 'root',
})
export class ReactionService {
  updateReaction(idReaction: number, arg1: { reactionType: import("../models/reaction.model").ReactionType; }) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:8075/react/';

  constructor(private http: HttpClient) {}

  createReaction(
    reaction: createReaction,
    postId: number,
    userId: number
  ): Observable<Reaction> {
    return this.http.post<Reaction>(
      `${this.apiUrl}create/${postId}/user/${userId}`,
      reaction
    );
  }

  getReactionsByPost(postId: number): Observable<Reaction[]> {
    return this.http.get<Reaction[]>(`${this.apiUrl}bypost?post_id=${postId}`);
  }

  removeReaction(reactionId: number): Observable<void> {
    const url = `${this.apiUrl}remove?id=${reactionId}`;
    return this.http.delete<void>(url);
  }
  
}
