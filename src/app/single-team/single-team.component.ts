import { User } from './../home/user';
import { AppointmentComponent } from './../appointment/appointment.component';
import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { Appointment } from '../appointment/appointment';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../home/user.service';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from '../appointment/appointment.service';
import { ChargeComponent } from '../charge/charge.component';

@Component({
  selector: 'single-team/:id',
  templateUrl: './single-team.component.html',
  styleUrls: ['./single-team.component.css']
})
export class SingleTeamComponent implements OnInit {
constructor(private dialog: MatDialog, private userService: UserService, private route: ActivatedRoute, private appointmentService: AppointmentService){}
  openAddAppointment(){
    this.dialog.open(AppointmentFormComponent);
  }
  openCharge(){
    this.dialog.open(ChargeComponent);
  }
  user!: User ;

  openCalendar(){
    this.dialog.open(AppointmentComponent);
  }



  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUserById(id).subscribe((user) => {
      this.user = user;
    });
    this.appointmentService.getAppointmentsByDoctor(id).subscribe(
      (response: Appointment[]) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  
}

