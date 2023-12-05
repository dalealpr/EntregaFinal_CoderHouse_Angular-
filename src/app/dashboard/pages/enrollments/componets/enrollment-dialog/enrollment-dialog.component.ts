import { Component } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { EnrollmentActions } from '../../store/enrollment.actions';
import {
  selectEquiposOptions,
  selectJugadoresOptions,
} from '../../store/enrollment.selectors';
import { Observable, take } from 'rxjs';
import { Equipo } from '../../../equipos/interfaces/equipo';
import { Jugador } from '../../../jugadores/interfaces/jugador';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-enrollment-dialog',
  templateUrl: './enrollment-dialog.component.html',
  styleUrls: ['./enrollment-dialog.component.scss'],
})
export class EnrollmentDialogComponent {
  equipoIdControl = new FormControl<number | null>(null);
  jugadorIdControl = new FormControl<number | null>(null);

  enrollmentForm = new FormGroup({
    equipoId: this.equipoIdControl,
    jugadorId: this.jugadorIdControl,
  });

  equipoOptions$: Observable<Equipo[]>;
  jugadorOptions$: Observable<Jugador[]>;

  constructor(
    private store: Store,
    private action$: Actions,
    private mathDialogRef: MatDialogRef<EnrollmentDialogComponent>,
    private matDialogRef: MatDialogRef<EnrollmentDialogComponent>
  ) {
    this.store.dispatch(EnrollmentActions.loadEnrollmentsDialogOptions());

    this.equipoOptions$ = this.store.select(selectEquiposOptions);
    this.jugadorOptions$ = this.store.select(selectJugadoresOptions);
    this.action$
      .pipe(ofType(EnrollmentActions.loadEnrollments), take(1))
      .subscribe({
        next: () => {
          this.matDialogRef.close();
        },
      });
  }

  closeDialog() {
    this.matDialogRef.close();
  }

  obSubmit() {
    this.store.dispatch(
      EnrollmentActions.createEnrollment({
        payload: this.enrollmentForm.getRawValue(),
      })
    );
  }
}
