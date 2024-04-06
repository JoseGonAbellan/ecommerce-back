import { OrderDetail, OrderDetailsPropierties } from "../../../domain/entities/order-detail.entity";

export class OrderDetailMapper{
    static mapToDomain(row: any): OrderDetail{
        return new OrderDetail(
            row.OrderDetailId,
            row.OrderId,
            row.ProductId,
            row.Quantity,
            row.Price
        )
    }
    static toEntity(orderDetail: OrderDetail): OrderDetailsPropierties{
        return { 
            orderDetailId: orderDetail.orderDetailId,
            orderId: orderDetail.orderId,
            productId: orderDetail.productId,
            quantity: orderDetail.quantity,
            price: orderDetail.price
        }
    }
}