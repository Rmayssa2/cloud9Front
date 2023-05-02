import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  email: string ="";

  constructor(private router: Router,private http: HttpClient  ) { }

  resetPwd(){
    console.log(this.email);
    
    let bodyData = {
      email: this.email,
    };

    this.http.post("  http://localhost:8075/api/auth/ResetPasswordMail ", bodyData).subscribe((resultData: any)=>{
      console.log(resultData);
      this.router.navigate(['ResetPwd',this.email ]);
     
      alert("check ur email!");
     

    });
 

  }
}
