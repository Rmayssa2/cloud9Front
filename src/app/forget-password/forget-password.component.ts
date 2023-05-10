import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../service/token-storage.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  email: string ="";
  isLoggedIn = false;
  phone: string="";
  isDisabled : boolean = false;
  isDisabled2: boolean = false;

  constructor(private router: Router,private http: HttpClient,private Storage: TokenStorageService,private toastr: ToastrService  ) { }


  
  resetPwd(){
    console.log(this.email);
    
    let bodyData = {
      email: this.email,
    };
    let data = {
      phone: this.phone,
    };
  
     if(this.email != ""){
      this.http.post(`${environment.apiUrl}/api/auth/ResetPasswordMail`, bodyData).subscribe((resultData: any)=>{
        console.log(resultData);
        this.toastr.success('Check ur email', 'You recived the code',{timeOut: 3000});
        this.router.navigate(['ResetPwd',this.email ]);

  
      });
    }
      else if(this.phone !="") {
        this.http.post(" ${environment.apiUrl}/api/auth/restPwdSms", data).subscribe((resultData: any)=>{
          console.log(resultData);
          this.toastr.success('Check ur phone', 'You recived the code',{timeOut: 3000});   
          this.router.navigate(['restSms',this.phone ]);
         
          
    
              
    
        });

      
    }

  
 

  }

  ngOnInit(): void {
    this.isLoggedIn = this.Storage.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.Storage.getUser();
      this.email = user.email;
    }
    
  }


  changeInput1(e : any) {
    this.isDisabled=true;
      }
      changeInput(e : any) {
        this.isDisabled2=true;
          }
    

}
