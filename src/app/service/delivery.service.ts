import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Delivery } from '../model/delivery';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  listDelivey: Delivery[]=[];
  private apiServerUrl = 'http://localhost:8075/delivery'; // replace with your server's API endpoint

  constructor(private http: HttpClient) { }

  public getDeliverys(): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(`${this.apiServerUrl}/getAlldeleviry`);
  }
  public addDelivery(delivery: Delivery): Observable<Delivery[]> {
    return this.http.post<Delivery[]>(`${this.apiServerUrl}/adddelevirey`, delivery);
  }
  public updateDelivery(delivery: Delivery): Observable<Delivery> {
    return this.http.put<Delivery>(`${this.apiServerUrl}/updatedelevirey`, delivery);
  }
  public deleteDeliveryById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/deletedelevirey/${id}`);
  }
}
