import { Module } from '@nestjs/common';
import { CostumersModule } from './costumers/costumers.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CostumersModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
