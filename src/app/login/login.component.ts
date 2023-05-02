import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenStorageService } from '../service/token-storage.service';
import { AuthService } from 'src/app/service/auth.service';
import { SocialAuthService, FacebookLoginProvider } from '@abacritt/angularx-social-login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  username: string ="";
  email: string ="";
  password: string ="";
  username1: string ="";
  password1: string ="";


  constructor(private router: Router,private http: HttpClient,private storageService: TokenStorageService,private auth:AuthService,private authService: SocialAuthService, ) { }
  user:any;
  loggedIn:any;


  showSignUp() {
    document.getElementById('container')!.classList.add("right-panel-active");
  }

  showSignIn() {
    document.getElementById('container')!.classList.remove("right-panel-active");
  }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
      this.router.navigateByUrl("/home");  

    }else {
      this.router.navigateByUrl("/login");  

    }
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(this.user);
      this.loggedIn = (user != null);
    });

  }

  loginUser(){
    console.log(this.username);
    console.log(this.password);
    
    let bodyData = {
      username: this.username1,
      password: this.password1,
    };

    this.http.post("http://localhost:8075/api/auth/signin", bodyData).subscribe((resultData: any)=>{
      this.storageService.saveToken(resultData.accessToken);
      this.storageService.saveUser(resultData);
      this.isLoginFailed = false;
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
      console.log("login user");
      console.log(resultData);
      this.router.navigateByUrl("/edit");
     

    }, 
    (error: any )=> {
      this.errorMessage = error;
      console.error('There was an error!', error);

    }
    
    );
 
  }
  
  reloadPage(): void {
    window.location.reload();
  }





  save() {
    let roles = new Set<string>();

    let bodyData = {
      "username" : this.username,
      "email" : this.email,
      "password" : this.password,
      "role":this.roles
    }


    this.http.post("http://localhost:8075/api/auth/signup", bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
      console.log(resultData);
     alert("done!");
     window.location.reload();
    });
      

  }
  
  changeRole(e : any) {
this.roles=[e.target.value];
  }


  signInWithGoogle(){
    this.auth.googleSignIn();
    
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);  
    sessionStorage.setItem('auth-token',JSON.stringify(this.user.response));
    this.router.navigate(['/edit']);
    
    
    
  }
}
