import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentDialogComponent } from './enrollment-dialog.component';

describe('EnrollmentDialogComponent', () => {
  let component: EnrollmentDialogComponent;
  let fixture: ComponentFixture<EnrollmentDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnrollmentDialogComponent]
    });
    fixture = TestBed.createComponent(EnrollmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
