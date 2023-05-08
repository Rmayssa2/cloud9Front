import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentFormDashComponent } from './appointment-form-dash.component';

describe('AppointmentFormDashComponent', () => {
  let component: AppointmentFormDashComponent;
  let fixture: ComponentFixture<AppointmentFormDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentFormDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentFormDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
