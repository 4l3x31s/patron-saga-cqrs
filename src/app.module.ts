import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ActivitiesModule } from './activities/activities.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    UsersModule,
    ActivitiesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'testdb',
      entities: [User],
      autoLoadEntities: true,
      synchronize: true,
    }),
    MongooseModule.forRoot('mongodb://root:example@localhost:27017/admin?retryWrites=true&loadBalanced=false&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-1'),
    CqrsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
