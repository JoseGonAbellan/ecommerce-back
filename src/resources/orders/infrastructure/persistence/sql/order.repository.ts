import { Injectable, NotFoundException } from "@nestjs/common";
import { NumberValueObject } from "../../../../../common/domain/value-objects/number.value-object";
import { DatabaseService } from "../../../../../common/infrastructure/persistance/sql/connector.database";
import { OrderRepository } from "../../../domain/contracts/order.repository";
import { OrderDetailsPropierties } from "../../../domain/entities/order-detail.entity";
import { Order, OrderPropierties } from "../../../domain/entities/order.entity";
import { OrderDetailMapper } from "./order-detail.mapper";
import { OrderMapper } from "./order.mapper";

@Injectable()
export class SqlOrderRepository implements OrderRepository {
  private readonly tableName = "orders";

  constructor(private readonly databaseService: DatabaseService) { }
  async create(order: Order): Promise<OrderPropierties> {
    try {
      const query = `
        INSERT INTO ${this.tableName} (userID, orderDate, totalAmount, orderStatus, shippingOptions, paymentMethod)
        VALUES (?, ?, ?, ?, ?, ?)`;
      const entity = OrderMapper.toEntity(order);

      await this.databaseService.query(query, [entity.userId, entity.orderDate, entity.totalAmount, entity.orderStatus, entity.shippingOptions, entity.paymentMethod]);
      const result = await this.databaseService.query("SELECT LAST_INSERT_ID() as orderId;");
      const orderId = result[0][0].orderId;
      order.orderId = NumberValueObject.create("order id", orderId);
      entity.orderId = order.orderId.getValue();
      return entity
    } catch (error) {
      console.error("Error al crear el pedido:", error);
      throw error;
    }
  }

  async findById(id: number): Promise<OrderPropierties> {
    try {
      const query = `SELECT o.*, od.* FROM ${this.tableName} o
                     LEFT JOIN orderdetails od ON o.orderID = od.orderID
                     WHERE o.orderID = ?`;
      const result = await this.databaseService.query(query, [id]) as any[][];
      const orderDetailsArray: OrderDetailsPropierties[] = [];
      const orderDb = {
        OrderID: result[0][0].OrderID,
        UserID: result[0][0].UserID,
        OrderDate: result[0][0].OrderDate,
        TotalAmount: result[0][0].TotalAmount,
        OrderStatus: result[0][0].OrderStatus,
        ShippingOptions: result[0][0].ShippingOptions,
        PaymentMethod: result[0][0].PaymentMethod,
        OrderDetails: orderDetailsArray
      }

      result[0].map((e) => {
        if (orderDb.OrderID === e.OrderID) {
          const orderDetailDb = {
            OrderID: e.OrderID,
            OrderDetailID: e.OrderDetailID,
            ProductID: e.ProductID,
            Quantity: e.Quantity,
            Price: e.Price,
          }
          const orderToDomain = OrderDetailMapper.mapToDomain(orderDetailDb)
          const orderPrimitives = OrderDetailMapper.toEntity(orderToDomain)
          orderDetailsArray.push(orderPrimitives)
        }
      })
      const order = OrderMapper.mapToDomain(orderDb);
      const orderPrimitives = OrderMapper.toEntity(order);
      return orderPrimitives;
    } catch (error) {
      console.error("Error al obtener el pedido:", error);
      throw new NotFoundException(`No se ha encontrado el pedido con la id ${id}`);
    }
  }

  async updateOrder(id: number, order: Order): Promise<OrderPropierties> {
    try {
      const query = `UPDATE ${this.tableName} 
                       SET userID = ?, 
                           totalAmount = ?,
                           orderStatus = ?
                       WHERE orderID = ?`;
      const entity = OrderMapper.toEntity(order);
      await this.databaseService.query(query, [
        entity.userId,
        entity.totalAmount,
        entity.orderStatus,
        id
      ]);
      const orderPrimitives = OrderMapper.toEntity(order)
      return orderPrimitives;
    } catch (error) {
      console.error("Error al actualizar el pedido:", error);
      throw error;
    }
  }

  async findAllByUserId(page: number = 1, pageSize: number = 5, userId: number, orderDate?: Date): Promise<OrderPropierties[]> {
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
      const orderArray = [];

      // Se recorre el resultado
      result[0].forEach((order) => {

        // Se comprueba que en el array de orders, no exista el order con el mismo id
        const existingOrderIndex = orderArray.findIndex(item => item.OrderID === order.OrderID);
        if (existingOrderIndex === -1) {
          // Si no existe el order, se crea un objeto order y se pushea a orderArray
          const orderEntity = {
            OrderID: order.OrderID,
            UserID: order.UserID,
            OrderDate: order.OrderDate,
            TotalAmount: order.TotalAmount,
            OrderStatus: order.OrderStatus,
            ShippingOptions: order.ShippingOptions,
            PaymentMethod: order.PaymentMethod,
            OrderDetails: [],
          }


          orderArray.push(orderEntity)
        }
        // En base de datos, al venir todo unido (order padre con el detalle), se saca un objeto con todos los order details y su orderId
        const orderDetailEntity = {
          OrderID: order.OrderID,
          OrderDetailID: order.OrderDetailID,
          ProductID: order.ProductID,
          Quantity: order.Quantity,
          Price: order.Price,
        }


        // Se recorre el array padre de las orders, y se comprueba si tiene el mismo orderId, si lo tiene se pushean al array de order detail las propiedades del pedido
        orderArray.forEach((e) => {
          if (e?.OrderID === orderDetailEntity.OrderID) {
            const orderDetailMapped = OrderDetailMapper.mapToDomain(orderDetailEntity);
            const orderDetailPrimitives = OrderDetailMapper.toEntity(orderDetailMapped)
            e.OrderDetails.push(orderDetailPrimitives)
          }
        })
      })
      const orders = orderArray.map((row: any) => OrderMapper.mapToDomain(row))
      const ordersPrimitives = orders.map((order) => OrderMapper.toEntity(order))
      return ordersPrimitives;

    } catch (error) {
      console.error("Error al obtener los pedidos:", error);
      throw new NotFoundException(`No se han encontrado los pedidos del usuario con la id ${userId}`);
    }
  }

  async findAll(page: number, pageSize: number, oderId?: number): Promise<OrderPropierties[]> {
    try {
      const startIndex = (page - 1) * pageSize;
      let query = `SELECT o.*, od.* FROM ${this.tableName} o
                     LEFT JOIN orderdetails od ON o.orderID = od.orderID`

      const queryParams: any[] = [];

      if (oderId) {
        query += " WHERE o.orderID = ?";
        queryParams.push(oderId);
      }

      query += " LIMIT ?, ?";
      queryParams.push(startIndex, pageSize);


      const result = await this.databaseService.query(query, queryParams) as any[][];
      // Se crea un array vacio
      const orderArray = [];

      // Se recorre el resultado
      result[0].forEach((order) => {

        // Se comprueba que en el array de orders, no exista el order con el mismo id
        const existingOrderIndex = orderArray.findIndex(item => item.OrderID === order.OrderID);
        if (existingOrderIndex === -1) {
          // Si no existe el order, se crea un objeto order y se pushea a orderArray
          const orderEntity = {
            OrderID: order.OrderID,
            UserID: order.UserID,
            OrderDate: order.OrderDate,
            TotalAmount: order.TotalAmount,
            OrderStatus: order.OrderStatus,
            ShippingOptions: order.ShippingOptions,
            PaymentMethod: order.PaymentMethod,
            OrderDetails: [],
          }


          orderArray.push(orderEntity)
        }
        // En base de datos, al venir todo unido (order padre con el detalle), se saca un objeto con todos los order details y su orderId
        const orderDetailEntity = {
          OrderID: order.OrderID,
          OrderDetailID: order.OrderDetailID,
          ProductID: order.ProductID,
          Quantity: order.Quantity,
          Price: order.Price,
        }


        // Se recorre el array padre de las orders, y se comprueba si tiene el mismo orderId, si lo tiene se pushean al array de order detail las propiedades del pedido
        orderArray.forEach((e) => {
          if (e?.OrderID === orderDetailEntity.OrderID) {
            const orderDetailMapped = OrderDetailMapper.mapToDomain(orderDetailEntity);
            const orderDetailPrimitives = OrderDetailMapper.toEntity(orderDetailMapped)
            e.OrderDetails.push(orderDetailPrimitives)
          }
        })
      })
      const orders = orderArray.map((row: any) => OrderMapper.mapToDomain(row))
      const ordersPrimitives = orders.map((order) => OrderMapper.toEntity(order))
      return ordersPrimitives;

    } catch (error) {
      console.error("Error al obtener los pedidos:", error);
      throw new NotFoundException(`No se han encontrado los pedidos ${error} `);
    }
  }
}
