import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Enrollment } from '../interface/enrollment';
import { Equipo } from '../../equipos/interfaces/equipo';
import { Jugador } from '../../jugadores/interfaces/jugador';
import { CreateEnrollmentPayolad } from 'src/app/shared/interfaces/enrollment';

export const EnrollmentActions = createActionGroup({
  source: 'Enrollment',
  events: {
    'Load Enrollments': emptyProps(),
    'Load Enrollments Success': props<{ data: Enrollment[] }>(),
    'Load Enrollments Failure': props<{ error: unknown }>(),
    'Load Enrollments Dialog Options': emptyProps(),
    'Load Enrollments Dialog Options Success': props<{
      equipos: Equipo[];
      jugadores: Jugador[];
    }>(),
    'Load Enrollments Dialog Options Failure': props<{ error: unknown }>(),
    'Create Enrollment': props<{ payload: CreateEnrollmentPayolad }>(),
    'Create Enrollment Failure': props<{ error: unknown }>(),
  },
});
