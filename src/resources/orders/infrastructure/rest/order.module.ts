import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../../../common/infrastructure/persistance/sql/database.module';
import { ProductModule } from '../../../products/infrastructure/rest/product.module';
import { CreateOrderDetailUseCase } from '../../application/uses-cases/create-order-detail.use-case';
import { CreateOrderUseCase } from '../../application/uses-cases/create-order.use-case';
import { FindAllOrdersByUserUseCase } from '../../application/uses-cases/find-all-orders-by-user.use-case';
import { FindAllOrdersUseCase } from '../../application/uses-cases/find-all-orders.use-case';
import { FindByIdOrderUseCase } from '../../application/uses-cases/find-by-id-order.use-case';
import { UpdateOrderUseCase } from '../../application/uses-cases/update-order.use-case';
import { CreateOrderWorkflow } from '../../application/workflows/create-order.workflow';
import { OrderDetailRepositoryToken } from '../../domain/contracts/order-detail.repository';
import { OrderRepositoryToken } from '../../domain/contracts/order.repository';
import { OrderDetailMapper } from '../persistence/sql/order-detail.mapper';
import { SqlOrderDetailRepository } from '../persistence/sql/order-detail.repository';
import { OrderMapper } from '../persistence/sql/order.mapper';
import { SqlOrderRepository } from '../persistence/sql/order.repository';
import { CreateOrderController } from './controllers/create-order.controller';
import { FindAllOrdersByUserController } from './controllers/find-all-orders-by-user.controller';
import { FindAllOrdersController } from './controllers/find-all-orders.controller';
import { FindByIdOrderController } from './controllers/find-by-id-order.controller';
import { UpdateOrderController } from './controllers/update-state-order.use-case.controller';

@Module({
  imports: [DatabaseModule, ProductModule],
  controllers: [CreateOrderController, FindAllOrdersByUserController, FindByIdOrderController, UpdateOrderController, FindAllOrdersController],
  providers: [
    CreateOrderUseCase,
    CreateOrderDetailUseCase,
    CreateOrderWorkflow,
    FindAllOrdersByUserUseCase,
    FindByIdOrderUseCase,
    FindAllOrdersUseCase,
    { provide: OrderRepositoryToken, useClass: SqlOrderRepository },
    { provide: OrderDetailRepositoryToken, useClass: SqlOrderDetailRepository },
    OrderMapper,
    OrderDetailMapper,
    DatabaseModule,
    UpdateOrderUseCase,
  ],
})
export class OrderModule { }