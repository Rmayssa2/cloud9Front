import { Component } from '@angular/core';

import { TokenStorageService } from '../service/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {
  constructor(private Storage: TokenStorageService,private router: Router) { }



  isoptionsDisplayed = false; 
  showOptions(){
    this.isoptionsDisplayed = !this.isoptionsDisplayed
  }

  logout(){
    this.Storage.signOut();
    
    this.router.navigateByUrl("/login");
  
  } 


}
