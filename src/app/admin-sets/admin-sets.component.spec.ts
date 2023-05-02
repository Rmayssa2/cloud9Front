import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSetsComponent } from './admin-sets.component';

describe('AdminSetsComponent', () => {
  let component: AdminSetsComponent;
  let fixture: ComponentFixture<AdminSetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
