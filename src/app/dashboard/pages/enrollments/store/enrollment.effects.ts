import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, mergeMap } from 'rxjs/operators';
import { of, Observable, forkJoin } from 'rxjs';
import { EnrollmentActions } from './enrollment.actions';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.local';
import { Enrollment } from '../interface/enrollment';
import { Equipo } from '../../equipos/interfaces/equipo';
import { Jugador } from '../../jugadores/interfaces/jugador';
import { CreateEnrollmentPayolad } from 'src/app/shared/interfaces/enrollment';

@Injectable()
export class EnrollmentEffects {
  loadOnrollments$ = createEffect(() => {
    return this.actions$.pipe(
      // Filtra las acciones que sean (OnrollmentActions.loadOnrollments)
      ofType(EnrollmentActions.loadEnrollments),
      // concatena un obs con otro obs
      concatMap(() =>
        this.getEnrollments().pipe(
          // Si la peticion sale bine dispara la accion
          map((data) => EnrollmentActions.loadEnrollmentsSuccess({ data })),
          // Si la peticion sale mal dispara la accion
          catchError((error) =>
            of(EnrollmentActions.loadEnrollmentsFailure({ error }))
          )
        )
      )
    );
  });
  //Filtro en las acciones loadEnrollmentDialogOptions
  loadEnrollmentDialogOptions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EnrollmentActions.loadEnrollmentsDialogOptions),
      concatMap(() =>
        this.getEnrollmentDialogOptions().pipe(
          map((resp) =>
            //Si sale bien
            EnrollmentActions.loadEnrollmentsDialogOptionsSuccess(resp)
          ),
          catchError((err) =>
            of(EnrollmentActions.loadEnrollmentsDialogOptionsFailure(err))
          )
        )
      )
    )
  );

  createEnrollment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EnrollmentActions.createEnrollment),
      concatMap((action) => {
        return this.createEnrollment(action.payload).pipe(
          //Si sale bien
          map((data) => EnrollmentActions.loadEnrollments()),
          //Si sale mal
          catchError((error) =>
            of(EnrollmentActions.createEnrollmentFailure({ error }))
          )
        );
      })
    )
  );

  constructor(private actions$: Actions, private httpClient: HttpClient) {}

  createEnrollment(payload: CreateEnrollmentPayolad): Observable<Enrollment> {
    return this.httpClient.post<Enrollment>(
      `${environment.baseUrl}enrollments`,
      payload
    );
  }

  getEnrollmentDialogOptions(): Observable<{
    equipos: Equipo[];
    jugadores: Jugador[];
  }> {
    return forkJoin([
      this.httpClient.get<Equipo[]>(`${environment.baseUrl}equipos`),
      this.httpClient.get<Jugador[]>(`${environment.baseUrl}players`),
    ]).pipe(
      map(([equipos, jugadores]) => {
        return {
          equipos,
          jugadores,
        };
      })
    );
  }

  getEnrollments(): Observable<Enrollment[]> {
    return this.httpClient.get<Enrollment[]>(
      `${environment.baseUrl}enrollments?_expand=jugador_expand=equipo`
    );
  }
}
