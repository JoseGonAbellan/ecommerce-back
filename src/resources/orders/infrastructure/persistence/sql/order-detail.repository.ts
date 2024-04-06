import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "../../../../../common/infrastructure/persistance/sql/connector.database";
import { OrderDetailRepository } from "../../../domain/contracts/order-detail.repository";
import { OrderDetail, OrderDetailsPropierties } from "../../../domain/entities/order-detail.entity";
import { OrderDetailMapper } from "./order-detail.mapper";
import { NumberValueObject } from "../../../../../common/domain/value-objects/number.value-object";

@Injectable()
export class SqlOrderDetailRepository implements OrderDetailRepository{
  private readonly tableName = "orderdetails";

 constructor(private readonly databaseService: DatabaseService) {}   

 async create(orderDetail: OrderDetail): Promise<OrderDetailsPropierties> {
     try {
        const query = `
        INSERT INTO ${this.tableName} (orderID, productID, quantity, price)
        VALUES (?, ?, ?, ?)`;
        const entity = OrderDetailMapper.toEntity(orderDetail);
      await this.databaseService.query(query,[entity.orderId, entity.productId, entity.quantity, entity.price]);
      const result = await this.databaseService.query("SELECT LAST_INSERT_ID() as orderDetailId;");
      const orderDetailId = result[0][0].orderDetailId;
      entity.orderDetailId = NumberValueObject.create("order detail id", orderDetailId).getValue();
      return entity;
     } catch (error) {
        console.error("Error al crear el detalle del pedido:", error);
        throw error;
     }   
    }  
   
}
