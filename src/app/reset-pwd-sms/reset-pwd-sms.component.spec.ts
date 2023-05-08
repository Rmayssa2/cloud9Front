import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPwdSmsComponent } from './reset-pwd-sms.component';

describe('ResetPwdSmsComponent', () => {
  let component: ResetPwdSmsComponent;
  let fixture: ComponentFixture<ResetPwdSmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPwdSmsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPwdSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
