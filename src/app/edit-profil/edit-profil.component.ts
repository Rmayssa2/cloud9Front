import { Component } from '@angular/core';
import { TokenStorageService } from '../service/token-storage.service';
import { Router } from '@angular/router';
import { HttpClient,  } from '@angular/common/http';
import { User } from '../models/user.model';
import { ToastrService } from 'ngx-toastr';
import { ConsultationFile } from '../models/consultationFile.model';
import { ConsultationFileService } from '../service/consultationFile.service';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.css']
})
export class EditProfilComponent {
  //consultation Files 
  files:ConsultationFile[] = [];

  roles: string[] = [];
  isLoggedIn = false;
  user = this.Storage.getUser();
  idUser = this.user.id;
  message: string = "";
  imageName: any = " ";
  name : string ="";
  phone : string ="";
  mail : string ="";

  newpassword :String="";
  oldpassword :String="";
  confirmpasswoed:String="";


  constructor(private consultationFileService: ConsultationFileService,private Storage: TokenStorageService, private router: Router, private httpClient: HttpClient,private storageService: TokenStorageService, private toastr: ToastrService) { }
  public onFileChanged(event: any) {

    var reader = new FileReader();
    reader.onload =  ()  => {
      var output :any  = document.getElementById('user_image');
      output.src = reader.result;
      this.imageName = reader.result!.toString();

      //document.getElementById('update-image-container').style.display = 'flex';
      //document.getElementById('update-image-container').style.justifyContent = 'center' ;
    }
    reader.readAsDataURL(event.target.files[0]);

  }
  
  save(): void {
    const user = new User();
    user.imageProfile= this.imageName;
    user.email=this.mail;
    user.password="";
    user.phonenumber=this.phone;
    user.username=this.name;
    user.isverified=1;
    

    console.log(user);
    this.httpClient.put(`${environment.apiUrl}/api/auth/update/${this.idUser}`, user ).subscribe((resultData: any)=>{
      this.storageService.saveUser(resultData);
      if(resultData){
        window.location.reload();

      }
      
    });
 

    
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

    this.isLoggedIn = this.Storage.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.Storage.getUser();
      this.roles = user.roles;
    }
    this.imageName= this.user.imageProfile;
   this.name = this.user.username;
   this.phone = this.user.phonenumber;
   console.log(this.phone,"this.phone")
   this.mail = this.user.email;



  }

  changePwd(): void {
    let body = {
      "newpassword" : this.newpassword,
      "oldpassword": this.oldpassword
    }
    if(this.confirmpasswoed == this.newpassword){ 
      this.httpClient.put(` ${environment.apiUrl}/api/auth/changepassword/${this.idUser}`, body ).subscribe((resultData: any)=>{
        console.log(resultData.statusCode);
          if(resultData.statusCode == 200){
            this.toastr.success('Password changed successfully', 'Well done',{timeOut: 3000});
          }
          else if(resultData.statusCode == 400){
            this.toastr.error('Your old password is incorrect', ' ERROR',{timeOut: 3000});}
         
       });
    }
    else{
      this.toastr.error('You have to write the same passwords', ' ERROR',{timeOut: 3000});
    }
 

  }
 
  goToConsultationFile(cf:ConsultationFile,index:number) {
    console.log("going to /consultation-file")
    // Navigate to the consultation file component with the consultationFile object
    this.router.navigate(['/consultation-file'], { state: { consultationFile: cf ,index:index} });
  }
}