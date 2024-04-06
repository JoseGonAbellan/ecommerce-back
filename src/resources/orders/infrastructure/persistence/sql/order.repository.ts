import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "../../../../../common/infrastructure/persistance/sql/connector.database";
import { OrderRepository } from "../../../domain/contracts/order.repository";
import { OrderDetail } from "../../../domain/entities/order-detail.entity";
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

  async findAll(page: number = 1, pageSize: number = 5, userId: number, orderDate?: Date): Promise<Order[]> {
    try {
        const startIndex = (page - 1) * pageSize;
        let query = `SELECT o.*, od.* FROM ${this.tableName} o
                     LEFT JOIN orderdetails od ON o.orderID = od.orderID
                     WHERE o.userID = ?`;

        const queryParams: any[] = [userId];

        if (orderDate) {
            query += " AND o.orderDate = ?";
            queryParams.push(orderDate);
        }

        query += " LIMIT ?, ?";
        queryParams.push(startIndex, pageSize);


        const result = await this.databaseService.query(query, queryParams) as any[][];
        // Se crea un array vacio
        const orderArray: Order[] = [];

       // Se recorre el resultado
        result[0].forEach((order) => {
          // Se comprueba que en el array de orders, no exista el order con el mismo id
        const existingOrderIndex = orderArray.findIndex(item => item.orderId === order.OrderID);
        if (existingOrderIndex === -1) {
          // Si no existe el order, se crea un objeto order y se pushea a orderArray
        const orderEntity = Order.create({
          orderId: order.OrderID, 
          userId: order.UserID,
          orderDate: order.OrderDate,
          totalAmount: order.TotalAmount,
          orderDetails: [],
        })


        orderArray.push(orderEntity)
      }
      // En base de datos, al venir todo unido (order padre con el detalle), se saca un objeto con todos los order details y su orderId
      const orderDetailEntity = OrderDetail.create({
        orderId: order.OrderID,
        orderDetailId: order.OrderDetailID,
        productId: order.ProductID, 
        quantity: order.Quantity,
        price: order.Price,
      })

        // Se recorre el array padre de las orders, y se comprueba si tiene el mismo orderId, si lo tiene se pushean al array de order detail las propiedades del pedido
        orderArray.forEach((e) => {
        if(e?.orderId === orderDetailEntity.orderId) {
          e.orderDetails.push(orderDetailEntity)
         }
        })
        })
        
       return orderArray;
  
    } catch (error) {
        console.error("Error al obtener los pedidos:", error);
        throw new NotFoundException(`No se han encontrado los pedidos del usuario con la id ${userId}`);
    }
}
}
