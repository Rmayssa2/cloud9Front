import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider} from '@angular/fire/auth'
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  constructor(private fireauth : AngularFireAuth, private router : Router,private http: HttpClient,private toastr: ToastrService) { }

 
  //sign in with google
  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {
 
      console.log(res.user?.email);
      this.http.get(`http://localhost:8075/api/auth/findbymail/${res.user?.email}`).subscribe((resultData: any)=>{
        console.log(resultData);
        if(resultData){
          this.router.navigate(['/edit']);
      sessionStorage.setItem('auth-user',JSON.stringify(resultData));
        }
        else{
          this.toastr.warning('User not found', 'You have to create an account',{timeOut: 3000});

        }
    });
      

    }, err => {
      alert(err.message);
    })
  }



}