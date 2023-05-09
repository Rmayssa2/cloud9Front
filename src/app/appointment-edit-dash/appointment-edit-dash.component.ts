import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppointmentService } from '../appointment/appointment.service';
import { Appointment } from '../appointment/appointment';
import { User } from '../models/user.model';
import { Type } from '../appointment/type';
import { UserService } from '../home/user.service';

@Component({
  selector: 'app-appointment-edit-dash',
  templateUrl: './appointment-edit-dash.component.html',
  styleUrls: ['./appointment-edit-dash.component.css']
})
export class AppointmentEditDashComponent {
  public controlGroup!: FormGroup;
  users: User[] = [];
  userId!: number;
  appointment: Appointment = new Appointment();
  patient: User[] = [];
  doctor: User[] = [];
    public type: Type[] = [  Type.PRESENCIEL,  Type.ENLIGNE];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AppointmentEditDashComponent>,
    private appointmentService: AppointmentService,
        private userService: UserService,

    @Inject(MAT_DIALOG_DATA) public data: { id: number , appointment: Appointment | null}
  ) {
    this.controlGroup = this.fb.group({
      patient: ['', Validators.required],
      doctor: ['', Validators.required],
      type: ['', Validators.required],
      dateStart: ['', Validators.required],
      dateEnd: ['', Validators.required],
    });
  }
  ngOnInit() {
  // Extract the appointment ID from the passed appointment object
  this.data.id = this.data.id;

  // Fetch the appointment data and pre-populate the form
  this.appointmentService.getAppointmentById(this.data.id).subscribe(appointment => {
    this.appointment= appointment;
    this.controlGroup.patchValue({
      patient: appointment.patient.idUser,
      doctor: appointment.doctor.idUser,
      type: appointment.type,
      dateStart: appointment.dateStart,
      dateEnd: appointment.dateEnd,
    });
  });
  this.userService.getusers().subscribe(users => {
    this.users = users;
    this.patient = users.filter(user => user.role[0].name === 'ROLE_PATIENT');
    this.doctor = users.filter(user => user.role[0].name === 'ROLE_DOCTOR');


  });
}
  onSave(): void {
    if (this.controlGroup.valid) {
      const selectedPatient = this.users.find(user => user.idUser === this.controlGroup.get('patient')?.value);
      const selectedDoctor = this.users.find(user => user.idUser === this.controlGroup.get('doctor')?.value);
  
      const appointment: Appointment = {
        idAppointment: this.data.id,
        patient: selectedPatient ,
        doctor: selectedDoctor,
       type: this.controlGroup.get('type')?.value,
        dateStart: this.controlGroup.get('dateStart')?.value,
        dateEnd: this.controlGroup.get('dateEnd')?.value,
      };

      // Update the appointment and close the dialog
      this.appointmentService.updateAppointment(appointment.idAppointment, appointment).subscribe(() => {
        this.dialogRef.close(true);
        location.reload();
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
