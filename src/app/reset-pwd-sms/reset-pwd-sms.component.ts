import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-reset-pwd-sms',
  templateUrl: './reset-pwd-sms.component.html',
  styleUrls: ['./reset-pwd-sms.component.css']
})
export class ResetPwdSmsComponent {
  phone: string ="";
  code: string ="";
  password: string ="";


  constructor(private router: Router,private http: HttpClient,private actRoute: ActivatedRoute, private toastr: ToastrService  ) { }

  resetDone(){
    console.log(this.code);
    
    let bodyData = {
      phone: this.actRoute.snapshot.paramMap.get('phone'),
      code: this.code,
      password:this.password
    };

    this.http.post(`${environment.apiUrl}/api/auth/ChangePwdSms`, bodyData).subscribe((resultData: any)=>{
      console.log(resultData);
      this.toastr.success('Password changed successfully', 'Well done',{timeOut: 3000});
      this.router.navigateByUrl("/login");     
    });
 
  }

}
