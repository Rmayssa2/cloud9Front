import { UserService } from './../home/user.service';
import { User } from './../home/user';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AppointmentService } from '../appointment/appointment.service';
import { Appointment } from '../appointment/appointment';
import { Type } from '../appointment/type';
import { ActivatedRoute } from '@angular/router';
import { ChargeComponent } from '../charge/charge.component';


@Component({
  selector: 'app-appointment-form/:id',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit {
  users: User[] = [];
  appointment!: Appointment;
  userId!: number;

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
      type: ['', Validators.required],
      dateStart: ['', Validators.required],
      dateEnd: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.userService.getusers().subscribe(users => {
      this.users = users;
    });
  
    const userId = this.route.snapshot.params['id'];
    console.log(userId );
  }
  
  onSave(): void {
    if (this.controlGroup.valid) {
      const selectedPatient = this.users.find(user => user.idUser === this.controlGroup.get('patient')?.value);
  
      const appointment: Appointment = {
        idAppointment: this.controlGroup.get('idAppointment')?.value,
        patient: selectedPatient || { idUser: 0, username: '', email: '', password: '', role: '' },
        doctor: { idUser: 1, username: '', email: '', password: '', role: '' },
        type: this.controlGroup.get('type')?.value,
        dateStart: this.controlGroup.get('dateStart')?.value,
        dateEnd: this.controlGroup.get('dateEnd')?.value
      };
  
      this.appointmentService.addAppointment(appointment).subscribe(() => {
        const dialogRef = this.dialog.open(ChargeComponent, {
          width: '400px',
          data: { amount: 2000 }
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result === true) {
            console.log('Payment successful');
            this.dialogRef.close(true);
          } else {
            console.log('Payment failed');
            this.dialogRef.close(false);
          }
        });
      });
    }
  }
  onCancel(): void {
    this.dialogRef.close(false);
  }  
}
