import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "../../../../../common/infrastructure/persistance/sql/connector.database";
import { OrderRepository } from "../../../domain/contracts/order.repository";
import { Order } from "../../../domain/entities/order.entity";
import { OrderMapper } from "./order.mapper";

@Injectable()
export class SqlOrderRepository implements OrderRepository{
  private readonly tableName = "orders";

 constructor(private readonly databaseService: DatabaseService) {}
async create(order: Order): Promise<Order> {
     try {
        const query = `
        INSERT INTO ${this.tableName} (userID, orderDate, totalAmount)
        VALUES (?, ?, ?)`;
        const entity = OrderMapper.toEntity(order);
       
      await this.databaseService.query(query,[entity.userId, entity.orderDate, entity.totalAmount]);
      const result = await this.databaseService.query("SELECT LAST_INSERT_ID() as orderId;");
        const orderId = result[0][0];
        order.orderId = orderId.orderId;
        return order;
     }  catch (error) {
        console.error("Error al crear el pedido:", error);
        throw error;
     }   
    }   

    async findById(id: number): Promise<Order> {
      try {
         const query= `SELECT * FROM ${this.tableName} WHERE orderID = ?`;
         const result = await this.databaseService.query(query, [id]) as any[][];
         const order = OrderMapper.mapToDomain(result[0][0]);
         return order;
      } catch (error) {
         console.error("Error al obtener el pedido:", error);
         throw new NotFoundException(`No se ha encontrado el pedido con la id ${id}`);
      }
    }

    async updateOrder(id: number, order: Order): Promise<Order> {
      try {
         const query = `UPDATE ${this.tableName} 
                       SET userID = ?, 
                           orderDate = ?,
                           totalAmount = ?
                       WHERE orderID = ?`;
         const entity = OrderMapper.toEntity(order);
        await this.databaseService.query(query, [
            entity.userId,
            entity.orderDate,
            entity.totalAmount,
            id
        ]);
        return order;
      } catch (error) {
         console.error("Error al actualizar el pedido:", error);
         throw error;
      }
    }
}
