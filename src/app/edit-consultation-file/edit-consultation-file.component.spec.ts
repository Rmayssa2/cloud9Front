import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConsultationFileComponent } from './edit-consultation-file.component';

describe('EditConsultationFileComponent', () => {
  let component: EditConsultationFileComponent;
  let fixture: ComponentFixture<EditConsultationFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditConsultationFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditConsultationFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
