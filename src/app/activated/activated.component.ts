import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-activated',
  templateUrl: './activated.component.html',
  styleUrls: ['./activated.component.css']
})
export class ActivatedComponent  implements OnInit {
  token: string ="";

  constructor(private activatedRoute : ActivatedRoute, private http: HttpClient, private router: Router) { 

  }

ngOnInit(): void {
  this.token = this.activatedRoute.snapshot.queryParamMap.get('token')|| " ";
  console.log(this.token);
  this.http.put(`${environment.apiUrl}/api/auth/activate/${this.token}`,{},{}).subscribe((resultData: any)=>{
    console.log(resultData);
   

  });
    
  }
}
