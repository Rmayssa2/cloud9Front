import { MatDialog } from '@angular/material/dialog';
import { AppointmentFormDashComponent } from '../appointment-form-dash/appointment-form-dash.component';
import { AppointmentComponent } from './../appointment/appointment.component';
import { AppointmentService } from './../appointment/appointment.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentEditDashComponent } from '../appointment-edit-dash/appointment-edit-dash.component';
import { Appointment } from '../appointment/appointment';

@Component({
  selector: 'app-admin-appointment',
  templateUrl: './admin-appointment.component.html',
  styleUrls: ['./admin-appointment.component.css']
})
export class AdminAppointmentComponent   {

  openEditDialog(appointment: Appointment, id: Number ) {
    const dialogRef = this.dialog.open(AppointmentEditDashComponent, {
      width: '500px',
      data: { appointment, id: id }
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      
    });
  }
  openAddAppointment(){
    this.dialog.open(AppointmentFormDashComponent);
  }
  listAppointment=this.appointmentService.listAppointment;

  constructor(private router: Router, private appointmentService: AppointmentService, private dialog: MatDialog) { }

  ngOnInit() {
    this.appointmentService.getAppointments().subscribe(data => {
      this.listAppointment = data;
    });
  }

  deleteAppointment(id: any) {
    console.log(id); // Check the value of livraison

    this.appointmentService.deleteAppointmentById(id)
        .subscribe(res => {
          
            console.log("deleteddd");
            window.location.reload(); // Reload the page after the delete
        });
}

}
