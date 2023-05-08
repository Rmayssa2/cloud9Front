import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConsultationFile } from '../models/consultationFile.model';
import { get } from 'jquery';
import { Prescription } from '../models/prescription.model';
import { Test } from '../models/test.model';
import { TokenStorageService } from './token-storage.service';
import { Appointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultationFileService {

    private baseUrl = 'http://localhost:8075/api/consultation-files'; 
    private appointmentsUrl = 'http://localhost:8075/api/appointments';
  
    constructor(private http: HttpClient, private tokenService:TokenStorageService) { }
  
    getAllConsultationFiles(): Observable<ConsultationFile[]> {
      return this.http.get(`${this.baseUrl}/user/${this.tokenService.getUser().id}`).pipe(
        map((response: any) => response.map((consultationFile: any) => new ConsultationFile(
          consultationFile.idFile,
          consultationFile.doctorNotes,
          consultationFile.prescriptionId,
          consultationFile.appointmentId,
          consultationFile.appointmentDate
        )))
      );
    }

    

    getAllAppointmentsByDoctorId(): Observable<Appointment[]> {
      return this.http.get(`${this.appointmentsUrl}/doctor/${this.tokenService.getUser().id}`).pipe(
        map((response: any) => response.map((appointment: any) => new Appointment(
          appointment.idAppointment,
          appointment.type,
          appointment.dateStart,
          appointment.patient,
          appointment.patientId,
          appointment.consultationFileId
        )))
      );
    }

    getAllTestsByUserId(): Observable<Test[]> {
        return this.http.get(`${this.baseUrl}/tests/${this.tokenService.getUser().id}`).pipe(
          map((response: any) => response.map((test: any) => new Test(
            test.idTest,
            test.testName,
          )))
        );
      }
  
      getAllTestsByPatientId(id?:string): Observable<Test[]> {
        return this.http.get(`${this.baseUrl}/tests/${id}`).pipe(
          map((response: any) => response.map((test: any) => new Test(
            test.idTest,
            test.testName,
          )))
        );
      }

      updatePrescription(id?:string,content?:String) :Observable<any>{
        console.log("in updateNote")
        let url = `${this.baseUrl}/note/${id}`;
        console.log(url);
        return this.http.put<any>(`${this.baseUrl}/prescription/${id}`,content);      }


      updateNote(id?:string,content?:String): Observable<any>{
        console.log("in updateNote")
        let url = `${this.baseUrl}/note/${id}`;
        console.log(url);
        return this.http.put<any>(`${this.baseUrl}/note/${id}`,content);
      }
  



    getPrescriptionById(id?:string): Observable<Prescription>{
        return this.http.get(`${this.baseUrl}/prescription/${id}`);
    }

    getConsultationFileByAppointmentId(id?:string): Observable<ConsultationFile>{
      return this.http.get(`${this.baseUrl}/appointment/${id}`) as Observable<ConsultationFile>;
  }

    addNewTestToConsultationFile(testName:string,id?: string): Observable<Test> {
        const url = `${this.baseUrl}/${id}/add-test/${testName}`;
        return this.http.post<Test>(url,null);
      }

      getImageUrl(id?: string): Observable<string> {
        const url = `${this.baseUrl}/test/image/${id}`;
        return this.http.get(url, { responseType: 'arraybuffer' }).pipe(
          map(response => {
            const arrayBufferView = new Uint8Array(response);
            const blob = new Blob([arrayBufferView], { type: 'image/jpeg' });
            const urlCreator = window.URL || window.webkitURL;
            return urlCreator.createObjectURL(blob);
          })
        );
      }

      addImage(url:string,formData: FormData) {
        this.http.post(url, formData).subscribe(
            response => {
              alert("Image Uploaded Successfully ! ")
            },
            error => {
              console.log('Error uploading image:', error);
            }
          );
      }
  }
  