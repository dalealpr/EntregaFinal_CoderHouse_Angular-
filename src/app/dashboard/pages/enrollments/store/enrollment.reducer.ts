import { createFeature, createReducer, on } from '@ngrx/store';
import { EnrollmentActions } from './enrollment.actions';
import { Enrollment } from '../interface/enrollment';
import { Equipo } from '../../equipos/interfaces/equipo';
import { Jugador } from '../../jugadores/interfaces/jugador';

export const enrollmentFeatureKey = 'enrollment';

export interface State {
  isLoading: boolean;
  isLoadingDialogOprtions: boolean;
  equiposOptions: Equipo[];
  jugadoresOptions: Jugador[];
  enrollments: Enrollment[];
  error: unknown;
}

export const initialState: State = {
  isLoading: false,
  isLoadingDialogOprtions: false,
  enrollments: [],
  equiposOptions: [],
  jugadoresOptions: [],
  error: null,
};

export const reducer = createReducer(
  initialState,
  //loadEnrollments
  on(EnrollmentActions.loadEnrollments, (state) => ({
    ...state,
    isLoading: true,
  })),
  //loadEnrollmentsSuccess
  on(EnrollmentActions.loadEnrollmentsSuccess, (state, { data }) => ({
    ...state,
    isLoading: false,
    enrollments: data,
  })),
  //loadEnrollmentsFailure
  on(EnrollmentActions.loadEnrollmentsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  //
  on(EnrollmentActions.loadEnrollmentsDialogOptions, (state) => {
    return {
      ...state,
      isLoadingDialogOprtions: true,
    };
  }),
  //
  on(
    EnrollmentActions.loadEnrollmentsDialogOptionsSuccess,
    (state, action) => ({
      ...state,
      equiposOptions: action.equipos,
      jugadoresOptions: action.jugadores,
      isLoadingDialogOprtions: false,
    })
  ),
  //
  on(
    EnrollmentActions.loadEnrollmentsDialogOptionsFailure,
    (state, action) => ({
      ...state,
      error: action.error,
      isLoadingDialogOprtions: false,
    })
  )
);

export const enrollmentFeature = createFeature({
  name: enrollmentFeatureKey,
  reducer,
});
