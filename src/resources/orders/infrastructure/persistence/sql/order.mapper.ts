import { Order, OrderPropierties } from "../../../domain/entities/order.entity";

export class OrderMapper{
    static mapToDomain(row: any): Order{
        return new Order(
            row.OrderId,
            row.UserId,
            row.OrderDate,
            row.TotalAmount
        )
    }
    static toEntity(order: Order): OrderPropierties{
        return { 
            orderId: order.orderId,
            userId: order.userId.getValue(),
            orderDate: order.orderDate,
            totalAmount: order.totalAmount
        }
    }
}