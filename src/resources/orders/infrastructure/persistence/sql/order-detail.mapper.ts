import { OrderDetail, OrderDetailsPropierties } from "../../../domain/entities/order-detail.entity";

export class OrderDetailMapper{
    static mapToDomain(row: any): OrderDetail{
        const orderDetail = OrderDetail.create({
            orderDetailId: row.OrderDetailID,
            orderId: row.OrderID,
            productId: row.ProductID,
            quantity: row.Quantity,
            price: parseInt(row.Price)
        })
        return orderDetail
    }
    static toEntity(orderDetail: OrderDetail): OrderDetailsPropierties{
        return { 
            orderDetailId: orderDetail.orderDetailId?.getValue(),
            orderId: orderDetail.orderId?.getValue(),
            productId: orderDetail.productId.getValue(),
            quantity: orderDetail.quantity.getValue(),
            price: orderDetail.price.getValue()
        }
    }
}