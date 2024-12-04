import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegisterUserCommand } from './commands/register-user.command';
import { GetUserQuery } from './queries/get-user.query';

@Controller('users')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async registerUser(@Body() body: { name: string; email: string; password: string }) {
    const { name, email, password } = body;
    return this.commandBus.execute(new RegisterUserCommand(name, email, password));
  }

  @Get(':id')
  async getUser(@Param('id') id: number) {
    return this.queryBus.execute(new GetUserQuery(id));
  }
}
