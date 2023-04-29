import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplySectionComponent } from './reply-section.component';

describe('ReplySectionComponent', () => {
  let component: ReplySectionComponent;
  let fixture: ComponentFixture<ReplySectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplySectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReplySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
