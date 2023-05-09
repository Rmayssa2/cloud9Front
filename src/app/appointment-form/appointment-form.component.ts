import { UserService } from './../home/user.service';
import { User } from './../home/user';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AppointmentService } from '../appointment/appointment.service';
import { Appointment } from '../appointment/appointment';
import { Type } from '../appointment/type';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ChargeComponent } from '../charge/charge.component';
import { TokenStorageService } from '../service/token-storage.service';
import { filter } from 'rxjs';


@Component({
  selector: 'app-appointment-form/:id',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit {
  users: User[] = [];
  appointment!: Appointment;
  userId!: number;
  user:any;
  roles: string;
  public controlGroup: FormGroup;
  public type: Type[] = [  Type.PRESENCIEL,  Type.ENLIGNE];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private appointmentService: AppointmentService,
    private dialog: MatDialog,
    private storageService : TokenStorageService,
    private actRoute: ActivatedRoute,
    private dialogRef: MatDialogRef<AppointmentFormComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { appointment: Appointment | null}
  ) {
    this.controlGroup = this.fb.group({
      type: ['', Validators.required],
      dateStart: ['', Validators.required],
      dateEnd: ['', Validators.required],
    });
  }
  ngOnInit() {

 

    this.user = this.storageService.getUser();
    console.log(this.user);
    this.roles = this.storageService.getUser().roles;
  }
  
  onSave(): void {

    if (this.controlGroup.valid) {


  
      const appointment: Appointment = {
        idAppointment: this.controlGroup.get('idAppointment')?.value,
        patient: { idUser: this.user.id ,username:'' ,email:'' ,password:'' ,imageProfile:'' ,phonenumber:''
        ,isverified:1, speciality:'' ,gender:'' ,height:'' ,weight:'' ,bloodType:'' ,age:'' ,education:'' ,certificate:'' 
        ,firstName:''
        ,lastName:''
        ,hourForWorkingStart :''
        ,hourForWorkingEnd :''
        ,city :''
        ,postCode:'',
     
        },  

         doctor: { idUser: 5 ,username:'' ,email:'' ,password:'' ,imageProfile:'' ,phonenumber:''
        ,isverified:1, speciality:'' ,gender:'' ,height:'' ,weight:'' ,bloodType:'' ,age:'' ,education:'' ,certificate:'' 
        ,firstName:''
        ,lastName:''
        ,hourForWorkingStart :''
        ,hourForWorkingEnd :''
        ,city :''
        ,postCode:'',
        
},
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
          console.log(result);
          if (result === true) {
            console.log('Payment successful');
            this.dialogRef.close(true);
          } else {
            this.dialogRef.close(true);
            console.log('Payment failed');
          }
        });
      
      });
    }
  }
  onCancel(): void {
    this.dialogRef.close(false);
  }  
}
