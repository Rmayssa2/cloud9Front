import { Component } from '@angular/core';
import { TokenStorageService } from '../service/token-storage.service';
import { Router } from '@angular/router';
import { HttpClient, } from '@angular/common/http';
import { User } from '../models/user.model';
import { ToastrService } from 'ngx-toastr';
import { ConsultationFile } from '../models/consultationFile.model';
import { ConsultationFileService } from '../service/consultationFile.service';
import { Appointment } from '../models/appointment.model';
import { contains } from 'jquery';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.css']
})
export class EditProfilComponent {
  //consultation Files 
  files:ConsultationFile[] = [];
  appointments:Appointment[] = [];

  roles: string = "";
  roleeee: string = "";
  isLoggedIn = false;
  user = this.Storage.getUser();
  idUser = this.user.id;
  message: string = "";
  imageName: any = " ";
  certificatimage: any = "";
  blood: string = "";
  phone: string = "";
  mail: string = "";
  isRoleD: boolean = false;
  isRoleP: boolean = false;
  gender: string = "";
  age: string = "";
  height: string = "";
  weight: string = "";
  city: string = "";
  postcode: string = "";
  firstname: string = "";
  lastname: string = "";
  isDisabled: boolean = true;
  isActive: boolean = true;

  newpassword: String = "";
  oldpassword: String = "";
  confirmpasswoed: String = "";
  education: string = "";
  speciality: string = "";

  hourForWorkingEnd: string = "";
  hourForWorkingStart: string = "";


  constructor(private consultationFileService: ConsultationFileService,private Storage: TokenStorageService, private router: Router, private httpClient: HttpClient, private storageService: TokenStorageService, private toastr: ToastrService) { }
  public onFileDocChanged(event: any) {
    console.log("output");

    var reader = new FileReader();
    reader.onload = () => {
      var output: any = document.getElementById('certificate_doc');
      output.src = reader.result;
      this.certificatimage = reader.result!.toString();
      console.log(this.certificatimage);
      //document.getElementById('update-image-container').style.display = 'flex';
      //document.getElementById('update-image-container').style.justifyContent = 'center' ;
    }
    reader.readAsDataURL(event.target.files[0]);

  }
  public onFileChanged(event: any) {

    var reader = new FileReader();
    reader.onload = () => {
      var output: any = document.getElementById('user_image');
      output.src = reader.result;
      this.imageName = reader.result!.toString();

      //document.getElementById('update-image-container').style.display = 'flex';
      //document.getElementById('update-image-container').style.justifyContent = 'center' ;
    }
    reader.readAsDataURL(event.target.files[0]);

  }
  save(): void {
    const user = new User();
    user.imageProfile = this.imageName;
    user.email = this.mail;
    user.phonenumber = this.phone;
    user.bloodType = this.blood;
    user.isverified = 1;
    user.age = this.age;
    user.gender = this.gender;
    user.weight = this.weight;
    user.height = this.height;
    user.postCode = this.postcode;
    user.city = this.city;
    user.firstName = this.firstname;
    user.lastName = this.lastname;
    user.education = this.education;
    user.certificate = this.certificatimage;
    user.speciality = this.speciality;
    user.hourForWorkingStart = this.hourForWorkingStart;
    user.hourForWorkingEnd = this.hourForWorkingEnd;

    console.log(user);

    this.httpClient.put(`http://localhost:8075/api/auth/update/${this.idUser}`, user).subscribe((resultData: any) => {
      this.storageService.saveUser(resultData);
      if (resultData) {
        console.log(resultData);
        this.toastr.success('Profile updated successfully', 'Well done', { timeOut: 3000 });
        window.location.reload();

      }

    });



  }
  changeGender(e: any) {
    this.gender = e.target.value;
    console.log(e.target.value);
  }





  changeState() {
    this.isDisabled = !this.isDisabled;
  }





  ngOnInit(): void {
      this.consultationFileService.getAllConsultationFiles().subscribe(
        (files) => {
          this.files = files;
          console.log(files);
        },
        (error) => {
          console.error(error);
        }
      );
      this.consultationFileService.getAllAppointmentsByDoctorId().subscribe(
        (appointment) => {
          this.appointments = appointment;
          console.log(appointment);
        },
        (error) => {
          console.error(error);
        }
      );

    this.isLoggedIn = this.Storage.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.Storage.getUser();

      console.log(user);
      this.roles = user.roles[0].name;
      this.roleeee = user.roles[0];
      console.log(this.roleeee)

    }
    this.imageName = this.user.imageProfile;
    this.phone = this.user.phonenumber;
    this.mail = this.user.email;
    this.lastname = this.user.lastName;
    this.firstname = this.user.firstName;
    this.blood = this.user.bloodType;
    this.age = this.user.age;
    this.height = this.user.height;
    this.weight = this.user.weight;
    this.postcode = this.user.postCode;
    this.city = this.user.city
    this.education = this.user.education;
    this.certificatimage = this.user.certificate;
    this.hourForWorkingEnd = this.user.hourForWorkingEnd;
    this.hourForWorkingStart=this.user.hourForWorkingStart;
    this.speciality=this.user.speciality;


    if (this.roles == "ROLE_DOCTOR" || this.roleeee == "ROLE_DOCTOR") {
      this.isRoleD = true;
    } else if (this.roles == "ROLE_PATIENT" || this.roleeee == "ROLE_PATIENT") {
      this.isRoleP = true;
    }

  }

  changePwd(): void {
    let body = {
      "newpassword": this.newpassword,
      "oldpassword": this.oldpassword
    }
    if (this.confirmpasswoed == this.newpassword) {
      this.httpClient.put(` http://localhost:8075/api/auth/changepassword/${this.idUser}`, body).subscribe((resultData: any) => {
        console.log(resultData);
        if (resultData.statusCode == 200) {
          this.toastr.success('Password changed successfully', 'Well done', { timeOut: 3000 });
        }
        else if (resultData.statusCode == 400) {
          this.toastr.error('Your old password is incorrect', ' ERROR', { timeOut: 3000 });
        }

      });
    }
    else {
      this.toastr.error('You have to write the same passwords', ' ERROR', { timeOut: 3000 });
    }


  }
   
  goToConsultationFile(cf:ConsultationFile,index:number) {
    console.log("going to /consultation-file")
    // Navigate to the consultation file component with the consultationFile object
    this.router.navigate(['/consultation-file'], { state: { consultationFile: cf ,index:index} });
  }

  goToConsultationFileAsDoctor(id:string,user:string) {
    console.log("going to /consultation-file-edit")
    console.log(id)
    // Navigate to the consultation file component with the consultationFile object
    this.router.navigate(['/consultation-file-edit'], { state: { appointmentId: id ,patientId:user} });
  }
}