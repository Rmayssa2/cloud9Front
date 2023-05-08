import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServerUrl = 'http://localhost:8075'; // replace with your server's API endpoint
  
  constructor(private http: HttpClient) {}
  
  public getusers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/user`);
  }

  public getUserById(id: number): Observable<User> {

    
    return this.http.get<User>(`${this.apiServerUrl}/user/${id}`);
  }
}
