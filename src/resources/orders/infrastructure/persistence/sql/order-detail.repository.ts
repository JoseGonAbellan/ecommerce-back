import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "../../../../../common/infrastructure/persistance/sql/connector.database";
import { OrderDetailRepository } from "../../../domain/contracts/order-detail.repository";
import { OrderDetail } from "../../../domain/entities/order-detail.entity";
import { OrderDetailMapper } from "./order-detail.mapper";

@Injectable()
export class SqlOrderDetailRepository implements OrderDetailRepository{
  private readonly tableName = "orderdetails";

 constructor(private readonly databaseService: DatabaseService) {}   

 async create(orderDetail: OrderDetail): Promise<OrderDetail> {
     try {
        const query = `
        INSERT INTO ${this.tableName} (orderID, productID, quantity, price)
        VALUES (?, ?, ?, ?)`;
        const entity = OrderDetailMapper.toEntity(orderDetail);
       
      await this.databaseService.query(query,[entity.orderId, entity.productId, entity.quantity, entity.price]);
      return orderDetail;
     } catch (error) {
        console.error("Error al crear el detalle del pedido:", error);
        throw error;
     }   
    }  
   
}
