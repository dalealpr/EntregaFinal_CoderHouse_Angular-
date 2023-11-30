import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { EnrollmentActions } from './store/enrollment.actions';
import { EnrollmentDialogComponent } from './componets/enrollment-dialog/enrollment-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.scss'],
})
export class EnrollmentsComponent {
  constructor(private store: Store, private dialog: MatDialog) {
    this.store.dispatch(EnrollmentActions.loadEnrollments());
  }

  addEnrollment(): void {
    this.dialog.open(EnrollmentDialogComponent, {
      height: '420px',
      width: '700px',
    });
  }
}
