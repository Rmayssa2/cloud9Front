import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { TokenStorageService } from '../service/token-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
   roles: string = "";
   roleeee: string = "";
   isRoleD: boolean = false;
   isRoleP: boolean = false;
  isLoggedIn = false;
  imageName :string ="";
  username?: string;
  constructor(private Storage: TokenStorageService,private router: Router) { }
  isoptionsDisplayed = false; 
  showOptions(){
    this.isoptionsDisplayed = !this.isoptionsDisplayed
  }

  ngOnInit(): void {

    // Header Sticky
    $(window).on('scroll', function () {
      if ($(this).scrollTop()! > 120) {
        $('.navbar-area').addClass("is-sticky");
      }
      else {
        $('.navbar-area').removeClass("is-sticky");
      }
    });
    this.isLoggedIn = this.Storage.isLoggedIn();
    console.log(this.isLoggedIn)

    if (this.isLoggedIn) {
      const user = this.Storage.getUser();
      this.roles = user.roles[0].name;
      this.roleeee =user.roles[0];
      console.log(this.roles);
      this.username = user.username;
      this.imageName = user.imageProfile;
      console.log("icii")



  }

  if (this.roles == "ROLE_DOCTOR" || this.roleeee == "ROLE_DOCTOR") {
    this.isRoleD = true;
  } else if (this.roles == "ROLE_PATIENT" || this.roleeee == "ROLE_PATIENT") {
    this.isRoleP = true;
  }

}
logout(){
  this.Storage.signOut();
  
  this.router.navigateByUrl("/login");

} 
}
