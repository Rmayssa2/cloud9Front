import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from './appointment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiServerUrl = 'http://localhost:8075'; // replace with your server's API endpoint
  
  constructor(private http: HttpClient) {}
  
  public getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiServerUrl}/appointment`);
  }
  public addAppointment(appointment: Appointment): Observable<Appointment[]> {
    return this.http.post<Appointment[]>(`${this.apiServerUrl}/addappointment`, appointment);
  }
  public updateAppointment(id: number, appointment: Appointment): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.apiServerUrl}/updateappointment/${id}`, appointment);
  }
  public deleteAppointmentById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/deleteappointment/${id}`);
  }
  public getAppointmentsByDoctor(userId: number) {
    return this.http.get<Appointment[]>(`${this.apiServerUrl}/doctor/${userId}/appointments`);
  }
  public getAppointmentsByPatient(userId: number) {
    return this.http.get<Appointment[]>(`${this.apiServerUrl}/patient/${userId}/appointments`);
  }
  charge(source: string, amount: number): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { source, amount };
    return this.http.post<string>(`${this.apiServerUrl}/charge`, body, { headers });
  }
}
