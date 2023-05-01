import { AppointmentService } from './../appointment/appointment.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-charge',
  templateUrl: './charge.component.html',
  styleUrls: ['./charge.component.css']
})
export class ChargeComponent implements OnInit {
  chargeForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private appointmentService: AppointmentService,
    private dialogRef: MatDialogRef<ChargeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.chargeForm = this.fb.group({
      source: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    const source = 'tok_visa';
    const amount = 5000;
    this.appointmentService.charge(source, amount).subscribe(
      response => {
        console.log(response);
        this.dialogRef.close(true);
      },
      error => {
        console.error(error);
        this.dialogRef.close(false);
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
  
}
