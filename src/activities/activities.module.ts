import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivityRepository } from './repositories/activity.repository';
import { RegisterActivityHandler } from './commands/handlers/register-activity.handler';
import { Activity, ActivitySchema } from './schemas/activity.schema';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Activity.name, schema: ActivitySchema }]),
    CqrsModule,
  ],
  providers: [
    ActivityRepository,
    RegisterActivityHandler,
  ],
})
export class ActivitiesModule {}
