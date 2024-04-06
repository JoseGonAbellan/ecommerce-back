import { Order, OrderPropierties } from "../../../domain/entities/order.entity";

export class OrderMapper{
    static mapToDomain(row: any): Order{
        return new Order(
            row.OrderId,
            row.UserId,
            row.OrderDate,
            row.TotalAmount,
            row.OrderDetails
        )
    }
    static toEntity(order: Order): OrderPropierties{
        return { 
            orderId: order.orderId,
            userId: order.userId,
            orderDate: order.orderDate,
            totalAmount: order.totalAmount,
            orderDetails: order.orderDetails
        }
    }
}