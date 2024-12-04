import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { RegisterUserCommand } from '../register-user.command';
import { UserRepository } from '../../repositories/user.repository';
import { UserRegisteredEvent } from '../../events/user-registered.event';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly eventBus: EventBus, // Inyección del EventBus
  ) {}

  async execute(command: RegisterUserCommand): Promise<any> {
    const { name, email, password } = command;
    const user = await this.userRepository.createUser(name, email, password);
    
    // Emitir evento después de registrar al usuario
    this.eventBus.publish(new UserRegisteredEvent(user.id, user.email));
    
    return user;
  }
}
