import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUserCommand } from '../delete-user.command';
import { UserRepository } from '../../repositories/user.repository';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
    private readonly logger = new Logger(DeleteUserHandler.name);
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: DeleteUserCommand): Promise<any> {
    const { userId } = command;
    try {
        await this.userRepository.deleteUser(userId);
        this.logger.log(`User with ID ${userId} deleted successfully`);
      } catch (error) {
        this.logger.error(`Failed to delete user with ID ${userId}:`, error.message);
        throw error; // Se podría propagar el error si se requiere manejarlo a nivel superior
      }
  }
}
