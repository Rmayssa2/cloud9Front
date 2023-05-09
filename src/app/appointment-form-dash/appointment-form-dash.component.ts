import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Type } from './../appointment/type';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject } from '@angular/core';
import { User } from '../models/user.model';
import { Appointment } from '../appointment/appointment';
import { UserService } from '../home/user.service';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from '../appointment/appointment.service';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';

@Component({
  selector: 'app-appointment-form-dash',
  templateUrl: './appointment-form-dash.component.html',
  styleUrls: ['./appointment-form-dash.component.css']
})
export class AppointmentFormDashComponent {
  users: User[] = [];
  appointment!: Appointment;
  userId!: number;
  patient: User[] = [];
  doctor: User[] = [];

  public controlGroup: FormGroup;
  public type: Type[] = [  Type.PRESENCIEL,  Type.ENLIGNE];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private appointmentService: AppointmentService,
    private dialog: MatDialog,

    private dialogRef: MatDialogRef<AppointmentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { appointment: Appointment | null}

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
        idAppointment: this.controlGroup.get('idAppointment')?.value,
        patient: selectedPatient ,
        doctor: selectedDoctor,
        type: this.controlGroup.get('type')?.value,
        dateStart: this.controlGroup.get('dateStart')?.value,
        dateEnd: this.controlGroup.get('dateEnd')?.value
      };
  
      this.appointmentService.addAppointment(appointment).subscribe(() => {
        this.dialogRef.close(true);
        location.reload(); // reload the page after the appointment is saved

      });
    }
  }
  
  onCancel(): void {
    this.dialogRef.close(false);
  }  
}
