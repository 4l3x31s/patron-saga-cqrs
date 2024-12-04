/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ICommand, ofType, CommandBus } from '@nestjs/cqrs';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { UserRegisteredEvent } from '../events/user-registered.event';
import { RegisterActivityCommand } from '../../activities/commands/register-activity.command';
import { DeleteUserCommand } from '../commands/delete-user.command';

@Injectable()
export class UserRegistrationSaga {
  private readonly logger = new Logger(UserRegistrationSaga.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  userRegistered = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UserRegisteredEvent),
      mergeMap((event) =>
        // Emitimos el comando para registrar la actividad
        this.commandBus.execute(
          new RegisterActivityCommand(event.userId, `User ${event.email} registered`),
        ).then(() => {
          this.logger.log(`Activity registered successfully for user ${event.userId}`);
          return null; // No hay acciones adicionales si todo es exitoso
        }).catch((error) => {
          this.logger.error(`Failed to register activity: ${error.message}`);
          this.logger.log(`Attempting to revert user registration for user ID ${event.userId}`);
          // Emitimos el comando para eliminar al usuario si falla el registro de la actividad
          return this.commandBus.execute(new DeleteUserCommand(event.userId))
            .then(() => {
              this.logger.log(`User with ID ${event.userId} deleted successfully`);
              return null; // Si la eliminación es exitosa, terminamos el flujo
            })
            .catch((deleteError) => {
              this.logger.error(`Failed to delete user with ID ${event.userId}: ${deleteError.message}`);
              // Aquí se podría emitir un evento crítico o manejar el error de forma más agresiva
              this.logger.error(`CRITICAL: Failed to revert registration for user ID ${event.userId}`);
              return null;
            });
        }),
      ),
    );
  }
}
