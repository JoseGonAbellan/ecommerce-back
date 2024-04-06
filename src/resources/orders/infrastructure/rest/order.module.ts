import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../../../common/infrastructure/persistance/sql/database.module';
import { OrderDetailRepositoryToken } from '../../domain/contracts/order-detail.repository';
import { OrderRepositoryToken } from '../../domain/contracts/order.repository';
import { OrderDetailMapper } from '../persistence/sql/order-detail.mapper';
import { SqlOrderDetailRepository } from '../persistence/sql/order-detail.repository';
import { OrderMapper } from '../persistence/sql/order.mapper';
import { SqlOrderRepository } from '../persistence/sql/order.repository';
import { CreateOrderUseCase } from '../../application/uses-cases/create-order.use-case';
import { CreateOrderDetailUseCase } from '../../application/uses-cases/create-order-detail.use-case';
import { CreateOrderWorkflow } from '../../application/workflows/create-order.workflow';
import { ProductModule } from '../../../products/infrastructure/rest/product.module';
import { CreateOrderController } from './controllers/create-order.controller';
import { FindAllOrdersByUserController } from './controllers/find-all-orders-by-user.controller';
import { FindAllOrdersUseCase } from '../../application/uses-cases/find-all-orders.use-case';
import { UpdateOrderUseCase } from '../../application/uses-cases/update-order.use-case';

@Module({
    imports:[DatabaseModule, ProductModule],
    controllers: [CreateOrderController, FindAllOrdersByUserController],
    providers: [
      CreateOrderUseCase,
      CreateOrderDetailUseCase,
      CreateOrderWorkflow,
      FindAllOrdersUseCase,
      {provide: OrderRepositoryToken, useClass: SqlOrderRepository},
      {provide: OrderDetailRepositoryToken, useClass: SqlOrderDetailRepository},
      OrderMapper,
      OrderDetailMapper,
      DatabaseModule,
      UpdateOrderUseCase,
  ],
})
export class OrderModule {}