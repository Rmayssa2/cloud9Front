import { Component, OnInit } from '@angular/core';
import { ConsultationFile } from '../models/consultationFile.model';
import { Router } from '@angular/router';
import { Prescription } from '../models/prescription.model';
import { ConsultationFileService } from '../service/consultationFile.service';
import { Test } from '../models/test.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { TokenStorageService } from '../service/token-storage.service';
import { environment } from 'src/environments/environment.prod';




@Component({
  selector: 'app-consultation-file',
  templateUrl: './consultation-file.component.html',
  styleUrls: ['./consultation-file.component.css']
})
export class ConsultationFileComponent implements OnInit {
  consultationFile?: ConsultationFile;
  tests?:Test[] = [];
  indexOfFile?: number;
  prescription?:Prescription;
  testName:string = "";
  itemForm!: FormGroup;
  imageUrl?: Observable<string>;
  image!:File;
  imageForm!: FormGroup;
  user!:User;


  constructor(private tokenService:TokenStorageService,private router: Router , private consultationFileService: ConsultationFileService,private formBuilder: FormBuilder,private modalService: NgbModal) { }

  ngOnInit() {
    this.user=this.tokenService.getUser();
    this.imageForm = this.formBuilder.group({
      file: ['']
    });
    this.itemForm = this.formBuilder.group({
      itemName: ['', Validators.required]
    });
        // Retrieve the consultationFile object from the previous component
        this.consultationFile = history.state.consultationFile;
        this.indexOfFile = history.state.index + 1 ;
    console.log(this.consultationFile);
    this.consultationFileService.getAllTestsByUserId().subscribe(
      (tests) => {
        this.tests = tests;
        console.log("Tests : ----")
        console.log(tests);
      },
      (error) => {
        console.error(error);
      }
    );


    this.consultationFileService.getPrescriptionById(this.consultationFile?.prescriptionId).subscribe(
      (prescription) => {
        this.prescription = prescription;
        console.log("Prescription: -----")
        console.log(prescription);
      },
      (error) => {
        console.error(error);
      }
    );


  }
  openModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
  }
  addTest(){
    console.log("This is the test name in the input : "+ this.testName);
    this.consultationFileService.addNewTestToConsultationFile(this.testName,this.consultationFile?.id).subscribe((response: any) => {
      console.log(response);
    });;
    console.log(this.testName,this.consultationFile?.id)
  }
  goBack(){
    this.router.navigate(['/edit']);
  }

  

  toggleDisplayDiv(id?:string) {  
      this.imageUrl = this.consultationFileService.getImageUrl(id);
  }  
  
  onFileSelect(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      this.image = file;
    }
  }
  addImageToTest(id?:string){
    const url = `${environment.apiUrl}/api/consultation-files/test/${id}/image`;
    console.log(url);
    const formData = new FormData();
    console.log(formData)
    formData.append('file', this.image);
    this.consultationFileService.addImage(url,formData);
  }
}