import { User } from './../home/user';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../home/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../appointment/appointment.service';
import { Appointment } from '../appointment/appointment';

@Component({
  selector: 'app-doctor-appointment',
  templateUrl: './doctor-appointment.component.html',
  styleUrls: ['./doctor-appointment.component.css']
})
export class DoctorAppointmentComponent implements OnInit{

  appointments: Appointment[] = [];
  constructor(private appointmentService: AppointmentService,private router:Router){}

  ngOnInit(): void {
    this.appointmentService.getAppointments().subscribe(appointments => {
      this.appointments = appointments;
      console.log(this.appointments);
    });
  }

  goToConsultationFileAsDoctor(id:number,user:number) {
    console.log("going to /consultation-file-edit")
    console.log(id)
    // Navigate to the consultation file component with the consultationFile object
    this.router.navigate(['/consultation-file-edit'], { state: { appointmentId: id ,patientId:user} });
  }
}
