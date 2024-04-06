import { Order, OrderPropierties } from "../../../domain/entities/order.entity";

export class OrderMapper{
    static mapToDomain(row: any): Order{
        const order =  Order.create({
            orderId: row.OrderID,
            userId: row.UserID,
            orderDate: row.OrderDate,
            totalAmount: row.TotalAmount ? parseInt(row.TotalAmount) : 1,
            orderDetails: row.OrderDetails
        })
         return order
    }

    static toEntity(order: Order): OrderPropierties{
        return { 
            orderId: order.orderId?.getValue(),
            userId: order.userId.getValue(),
            orderDate: order.orderDate,
            totalAmount: order.totalAmount?.getValue(),
            orderDetails: order.orderDetails.map((order) => order.getValue())
        }
    }
}