import { Component } from '@angular/core';
import { TokenStorageService } from '../service/token-storage.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isLoggedIn = false;
  roles: string[] = [];

  constructor(private Storage: TokenStorageService,private router: Router) { }


  ngOnInit(): void {
  this.isLoggedIn = this.Storage.isLoggedIn();

  if (this.isLoggedIn) {
    const user = this.Storage.getUser();
    this.roles = user.roles;

    this.router.navigateByUrl("/home");  
    
}
else {
  this.router.navigateByUrl("/login");  

}
}
}
