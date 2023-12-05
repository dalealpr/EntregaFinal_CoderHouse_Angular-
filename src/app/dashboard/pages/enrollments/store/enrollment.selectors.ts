import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromEnrollment from './enrollment.reducer';
import { state } from '@angular/animations';

export const selectEnrollmentState =
  createFeatureSelector<fromEnrollment.State>(
    fromEnrollment.enrollmentFeatureKey
  );

export const selectEnrollments = createSelector(
  selectEnrollmentState,
  (state) => state.enrollments
);

export const selectEquiposOptions = createSelector(
  selectEnrollmentState,
  (state) => state.equiposOptions
);

export const selectJugadoresOptions = createSelector(
  selectEnrollmentState,
  (state) => state.jugadoresOptions
);
