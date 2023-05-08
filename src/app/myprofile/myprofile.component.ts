import { Component } from '@angular/core';
import { TokenStorageService } from '../service/token-storage.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent {

  roles: string = "";
  roleeee: string = "";
  isLoggedIn = false;
  user = this.Storage.getUser();
  idUser = this.user.id;
  constructor(private Storage: TokenStorageService, private router: Router, private httpClient: HttpClient, private storageService: TokenStorageService, private toastr: ToastrService) { }


  ngOnInit(): void {
    this.isLoggedIn = this.Storage.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.Storage.getUser();
      console.log(user);
      this.roles = user.roles[0].name;
      this.roleeee = user.roles[0];
      console.log(this.roleeee)

    }
}

}
