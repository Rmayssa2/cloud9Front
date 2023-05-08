import { Component, OnInit } from '@angular/core';
import { ConsultationFile } from '../models/consultationFile.model';
import { Test } from '../models/test.model';
import { Prescription } from '../models/prescription.model';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../service/token-storage.service';
import { Router } from '@angular/router';
import { ConsultationFileService } from '../service/consultationFile.service';

@Component({
  selector: 'app-edit-consultation-file',
  templateUrl: './edit-consultation-file.component.html',
  styleUrls: ['./edit-consultation-file.component.css']
})
export class EditConsultationFileComponent implements OnInit{
  consultationFile?: ConsultationFile;
  appointmentId?:string;
  patientId?:string;
  tests?:Test[] = [];
  prescription?:Prescription;
  indexOfFile?: number;
  testName:string = "";
  imageUrl?: Observable<string>;
  image!:File;
  notesContent:string = "Initial";
  prescriptionContent:string = "Initial";


  constructor(private tokenService:TokenStorageService,private router: Router , private consultationFileService: ConsultationFileService) { }

  ngOnInit(): void {
    this.appointmentId = history.state.appointmentId;
    this.patientId = history.state.patientId;

    this.consultationFileService.getConsultationFileByAppointmentId(this.appointmentId).subscribe(
      (cf) => {
        this.consultationFile = cf;
        console.log("CF: -----")
        console.log(cf);
        this.notesContent = cf.doctorNotes;

        this.consultationFileService.getPrescriptionById(this.consultationFile?.prescriptionId).subscribe(
          (prescription) => {
            this.prescription = prescription;
            console.log("Prescription: -----")
            console.log(prescription);
            this.prescriptionContent = prescription.content;
          },
          (error) => {
            console.error(error);
          }
        );
    
      },
      (error) => {
        console.error(error);
      }
    );


    this.consultationFileService.getAllTestsByPatientId(this.patientId).subscribe(
      (tests) => {
        this.tests = tests;
        console.log("Tests : ----")
        console.log(tests);
      },
      (error) => {
        console.error(error);
      }
    );
      }

  goBack(){
    this.router.navigate(['/edit']);
  }

  

  toggleDisplayDiv(id?:string) {  
      this.imageUrl = this.consultationFileService.getImageUrl(id);
  }  


  updatePrescription(){
    console.log("updating Prescription");
    console.log(this.prescriptionContent);
    this.consultationFileService.updatePrescription(this.appointmentId,this.prescriptionContent).subscribe(
      (response) => {
        
        this.consultationFileService.getPrescriptionById(this.consultationFile?.prescriptionId).subscribe(
          (prescription) => {
            this.prescription = prescription;
            console.log("Prescription: -----")
            console.log(prescription);
            this.prescriptionContent = prescription.content;
          },
          (error) => {
            console.error(error);
          }
        );
        alert('Prescription updated successfully:');
        window.location.reload();
      },
      (error) => {
        console.error('Error updating note:', error);
      }
    );
  }

  updateNote(){
    console.log("updating Note");
    console.log(this.notesContent);
    this.consultationFileService.updateNote(this.appointmentId,this.notesContent).subscribe(
      (response) => {
        console.log('Note updated successfully:', response);
        alert('Notes updated successfully:');
        window.location.reload();
      },
      (error) => {
        console.error('Error updating note:', error);
      }

    );
  }
}
