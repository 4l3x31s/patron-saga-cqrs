/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterActivityCommand } from '../register-activity.command';
import { ActivityRepository } from '../../repositories/activity.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
@CommandHandler(RegisterActivityCommand)
export class RegisterActivityHandler implements ICommandHandler<RegisterActivityCommand> {
  constructor(private readonly activityRepository: ActivityRepository) {}

  async execute(command: RegisterActivityCommand): Promise<any> {
    const { userId, description } = command;

    // Simulamos un fallo aquí
    //throw new Error('Simulated error: Unable to save activity to MongoDB');

    // Si no hubiera error, se guardaría la actividad en MongoDB
    return this.activityRepository.createActivity(userId, description);
  }
}
