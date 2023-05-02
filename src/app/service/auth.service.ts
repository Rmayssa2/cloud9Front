import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider} from '@angular/fire/auth'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  constructor(private fireauth : AngularFireAuth, private router : Router) { }

 
  //sign in with google
  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {

      this.router.navigate(['/edit']);
      sessionStorage.setItem('auth-token',JSON.stringify(res.user));

    }, err => {
      alert(err.message);
    })
  }



}