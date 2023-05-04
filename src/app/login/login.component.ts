import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenStorageService } from '../service/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  username: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private storageService: TokenStorageService
  ) {}

  showSignUp() {
    document.getElementById('container')!.classList.add('right-panel-active');
  }

  showSignIn() {
    document
      .getElementById('container')!
      .classList.remove('right-panel-active');
  }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }

  loginUser() {
    console.log(this.username);
    console.log(this.password);

    let bodyData = {
      username: this.username,
      password: this.password,
    };

    this.http
      .post('http://localhost:8080/api/auth/signin', bodyData)
      .subscribe((resultData: any) => {
        this.storageService.saveToken(resultData.accessToken);
        this.storageService.saveUser(resultData);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        console.log('login user');

        console.log(resultData);

        this.router.navigateByUrl('/home');
      });
  }

  reloadPage(): void {
    window.location.reload();
  }

  save() {
    let bodyData = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    this.http
      .post('http://localhost:8080/api/auth/signup', bodyData, {
        responseType: 'text',
      })
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('done!');
      });
  }
}
