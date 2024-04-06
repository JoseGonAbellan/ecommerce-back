import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../../../common/infrastructure/persistance/sql/database.module';
import { CreateProductUseCase } from '../../application/uses-cases/create-product.use-case';
import { DeleteProductUseCase } from '../../application/uses-cases/delete-product.use-case';
import { FindAllProductsUseCase } from '../../application/uses-cases/find-all-products.use-case';
import { FindByIdProductUseCase } from '../../application/uses-cases/find-byid-product.use-case';
import { UpdateProductUseCase } from '../../application/uses-cases/update-product.use-case';
import { ProductRepositoryToken } from '../../domain/contracts/products.repository';
import { ProductMapper } from '../persistence/sql/product.mapper';
import { SqlProductRepository } from '../persistence/sql/product.repository';
import { CreateProductController } from './controlers/create-product.controller';
import { DeleteProductController } from './controlers/delete-product.controller';
import { FindAllProductsController } from './controlers/find-all-products.controller';
import { FindByIdProductController } from './controlers/find-by-id-product.controller';
import { UpdateProductController } from './controlers/update-product.controller';

@Module({
    imports:[DatabaseModule],
    controllers: [CreateProductController, DeleteProductController, FindAllProductsController, FindByIdProductController, UpdateProductController],
    providers: [
      CreateProductUseCase,
      DeleteProductUseCase,
      FindAllProductsUseCase,
      FindByIdProductUseCase,
      UpdateProductUseCase,
      {provide: ProductRepositoryToken, useClass: SqlProductRepository},
      ProductMapper,
      DatabaseModule,
  ],
  exports: [FindByIdProductUseCase]
})
export class ProductModule {}