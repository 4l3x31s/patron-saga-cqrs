import { ICommand } from '@nestjs/cqrs';

export class RegisterActivityCommand implements ICommand {
  constructor(
    public readonly userId: number,
    public readonly description: string,
  ) {}
}
