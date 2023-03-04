import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CostumersController } from './controllers/costumers/costumers.controller';
import { ValidateCostumerAccountMiddleware } from './middlewares/validate-costumer-account.middleware';
import { ValidateCostumerMiddleware } from './middlewares/validate-costumer.middleware';
import { CostumersService } from './services/costumers/costumers.service';

@Module({
  controllers: [CostumersController],
  providers: [CostumersService],
})
export class CostumersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateCostumerMiddleware, ValidateCostumerAccountMiddleware)
      .forRoutes(CostumersController);
  }
}
