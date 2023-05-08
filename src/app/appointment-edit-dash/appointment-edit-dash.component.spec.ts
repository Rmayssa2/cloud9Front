import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentEditDashComponent } from './appointment-edit-dash.component';

describe('AppointmentEditDashComponent', () => {
  let component: AppointmentEditDashComponent;
  let fixture: ComponentFixture<AppointmentEditDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentEditDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentEditDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
