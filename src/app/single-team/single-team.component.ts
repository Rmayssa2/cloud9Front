import { User } from '../models/user.model';
import { AppointmentComponent } from './../appointment/appointment.component';
import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { Appointment } from '../appointment/appointment';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../home/user.service';
import { AppointmentService } from '../appointment/appointment.service';
import { ChargeComponent } from '../charge/charge.component';
import { TokenStorageService } from '../service/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'single-team/:id',
  templateUrl: './single-team.component.html',
  styleUrls: ['./single-team.component.css']
})


export class SingleTeamComponent implements OnInit {
  user? : User ;
  constructor(private router: Router,private http: HttpClient,private actRoute: ActivatedRoute,private userService: UserService, private dialog: MatDialog, private appointmentService: AppointmentService) { }
  openAddAppointment(){
    this.dialog.open(AppointmentFormComponent);
  }
  openCharge(){
    this.dialog.open(ChargeComponent);
  }
  ngOnInit(): void{
  let id = this.actRoute.snapshot.paramMap.get('id');
  

    this.http.get(`http://localhost:8075/api/auth/getDoctorById/${id}`).subscribe((resultData: any)=>{
      console.log(resultData);
      this.user = resultData;
           
   
     

    });
  }

  openCalendar(){
    this.dialog.open(AppointmentComponent);
  }




  
  
}

