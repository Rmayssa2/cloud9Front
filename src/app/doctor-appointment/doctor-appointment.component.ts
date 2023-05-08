import { User } from './../home/user';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../home/user.service';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from '../appointment/appointment.service';
import { Appointment } from '../appointment/appointment';

@Component({
  selector: 'app-doctor-appointment',
  templateUrl: './doctor-appointment.component.html',
  styleUrls: ['./doctor-appointment.component.css']
})
export class DoctorAppointmentComponent implements OnInit{

  appointments: Appointment[] = [];
  constructor(private appointmentService: AppointmentService){}

  ngOnInit(): void {
    this.appointmentService.getAppointments().subscribe(appointments => {
      this.appointments = appointments;
      console.log(this.appointments);
    });
  }
}
