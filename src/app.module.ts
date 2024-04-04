import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './resources/orders/infrastructure/rest/order.module';
import { ProductModule } from './resources/products/infrastructure/rest/product.module';
import { UserModule } from './resources/users/infrastructure/rest/user.module';
@Module({
  imports: [ProductModule, UserModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
