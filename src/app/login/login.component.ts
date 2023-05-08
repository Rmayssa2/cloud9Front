import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenStorageService } from '../service/token-storage.service';
import { AuthService } from 'src/app/service/auth.service';
import { SocialAuthService, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';


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

  

  constructor(private router: Router,private http: HttpClient,private storageService: TokenStorageService,private auth:AuthService,private authService: SocialAuthService,private toastr: ToastrService ) { }
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
    console.log(this.password1.length)
        if(this.password1.length> 6){
    this.http.post("http://localhost:8075/api/auth/signin", bodyData).subscribe((resultData: any)=>{
      if(resultData.statusCode == 320){
        this.toastr.success("Your account has been unlocked. Please try to login again.", 'Well done',{timeOut: 3000});

      }
      else if(resultData.statusCode == 120){
        this.toastr.error("Your account has been locked due to 3 failed attempts."
        + " It will be unlocked after 24 hours.", 'OOPS',{timeOut: 5000});


      }
      else if(resultData.statusCode == 230){
        this.toastr.error("Account is  not verified! ."
        , " Check your email you have the link",{timeOut: 3000});

      }
      else if(resultData.statusCode == 400){
        this.toastr.error("Mot de passe incorrect ."
        , " try again ",{timeOut: 3000});

      }
      else {     this.storageService.saveToken(resultData.accessToken);
        this.storageService.saveUser(resultData);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        console.log(this.roles[0]);
        if(this.roles[0] == "ROLE_PATIENT" || this.roles[0] == "ROLE_DOCTOR" || this.roles[0]=="ROLE_PHARMACY" ){
          this.router.navigateByUrl("/edit");
  
        }else if (this.roles[0] == "ROLE_ADMIN"){
          this.router.navigateByUrl("/admin");
  
        }}

  

     

    }, 
    (error: any )=> {
      this.errorMessage = error;
      console.error('There was an error!', error);

    }
    
    );
  }
  else{
    this.toastr.error("Mot de passe must have 6 or more caracters."
    , " try again ",{timeOut: 3000});
  }
 
  }
  
  reloadPage(): void {
    window.location.reload();
  }





  save() {

    let bodyData = {
      "username" : this.username,
      "email" : this.email,
      "password" : this.password,
      "role":this.roles
    }
     
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if(this.username.length == 0 || this.email.length == 0 || this.password.length == 0){
      this.toastr.error("You have to fill this information."
      , " try again ",{timeOut: 5000});
    }else if (this.username.length<3 ){
      this.toastr.error("this field must contain more than 3 caracters"
      , " try again ",{timeOut: 5000});
    }else if (this.password.length<6 ){
      this.toastr.error("Password must contain more than 6 caracters"
      , " try again ",{timeOut: 5000});
    }else if(expression.test(this.email) == false){
      this.toastr.error("Email must be like this xyz@exemple.com"
      , " try again ",{timeOut: 5000});
    }
else {
    this.http.post("http://localhost:8075/api/auth/signup", bodyData).subscribe((resultData: any)=>
    {
      console.log(resultData.statusCode);

      if(resultData.statusCode == 400){
        this.toastr.error("This username is already in use"
      , "Choose another one ",{timeOut: 5000});
      }else if(resultData.statusCode == 404){
        this.toastr.error("This email is already in use"
      , " Choose another one ",{timeOut: 5000});
      }else{
        this.toastr.success("Check ur email to activate your account"
        , "User registred successfully ",{timeOut: 5000});
      }
        
    });
      


}
}
  changeRole(e : any) {
this.roles=[e.target.value];
  }


  signInWithGoogle(){
    this.auth.googleSignIn();
    
  }

  signInWithFB(): void {
    
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);  
    this.authService.authState.subscribe((result) => {
console.log(result.email);
this.http.get(`http://localhost:8075/api/auth/findbymail/${result.email}`).subscribe((resultData: any)=>{
  console.log(resultData);
  if(resultData ){
    sessionStorage.setItem('auth-user',JSON.stringify(resultData));
    this.router.navigate(['/edit']);
  }
  else{
    this.toastr.warning('User not found', 'You have to create an account',{timeOut: 3000});

  }

    });
  
    
    
  });
}
}
