import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { TokenStorageService } from '../service/token-storage.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Role } from '../models/role.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  isLoggedIn = false;
  roles: string[] = [];
  user? : User ;


  constructor(private router: Router,private http: HttpClient,private toastr: ToastrService , private Storage: TokenStorageService) { }


  listUsers:User[] = [];

  getAllUsers(){
    this.http.get<User[]>("http://localhost:8075/api/auth/getDoctor/ROLE_DOCTOR").subscribe((resultData)=>{
      console.log(resultData);
this.listUsers = resultData;
console.log(this.listUsers);

    });

    

    
  }

  ngOnInit(): void {
  this.isLoggedIn = this.Storage.isLoggedIn();
  this.user=this.Storage.getUser();
  this.getAllUsers();

 
    this.router.navigateByUrl("/home");  
    




}
}
