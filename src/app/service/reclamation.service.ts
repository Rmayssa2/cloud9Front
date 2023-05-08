import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reclamation } from '../model/reclamation';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  listReclamation: Reclamation[]=[];

  private apiServerUrl = 'http://localhost:8075/reclamations'; // replace with your server's API endpoint

  constructor(private http: HttpClient) { }

  public getReclamations(): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(`${this.apiServerUrl}/getAllReclamations`);
  }
  public addReclamation(title:string,description:string,datereclam:string): Observable<Reclamation[]> {
    return this.http.post<Reclamation[]>(`${this.apiServerUrl}/ajouterreclamation`, {title,description ,datereclam});
  }
  
  public deleteReclamationId(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/deletereclam/${id}`);
  }
}
