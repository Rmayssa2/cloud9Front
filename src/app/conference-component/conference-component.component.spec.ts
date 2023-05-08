import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConferenceComponentComponent } from './conference-component.component';

describe('ConferenceComponentComponent', () => {
  let component: ConferenceComponentComponent;
  let fixture: ComponentFixture<ConferenceComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConferenceComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConferenceComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
