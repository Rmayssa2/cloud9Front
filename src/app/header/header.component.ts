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
   roles: string[] = [];
  isLoggedIn = false;
  imageName :string ="";
  username?: string;
  constructor(private Storage: TokenStorageService,private router: Router) { }

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

    if (this.isLoggedIn) {
      const user = this.Storage.getUser();
      this.roles = user.roles;
      this.username = user.username;
      this.imageName = user.imageProfile;


  }

}
logout(){
  this.Storage.signOut();
  
  this.router.navigateByUrl("/login");

} 
}
