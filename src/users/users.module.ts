import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { UserRepository } from './repositories/user.repository';
import { RegisterUserHandler } from './commands/handlers/register-user.handler';
import { GetUserHandler } from './queries/handlers/get-user.handler';
import { UserRegistrationSaga } from './sagas/user-registration.saga';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { DeleteUserHandler } from './commands/handlers/delete-user.handler';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CqrsModule,
  ],
  controllers:[
    UsersController
  ],
  providers: [
    UserRepository,
    RegisterUserHandler,
    GetUserHandler,
    UserRegistrationSaga,
    DeleteUserHandler
  ],
})
export class UsersModule {}
