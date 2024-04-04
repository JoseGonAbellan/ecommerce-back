import { OrderDetail } from "../entities/order-detail.entity";


export interface OrderDetailRepository{
    create(order: OrderDetail) : Promise<OrderDetail>
}
export const OrderDetailRepositoryToken = Symbol("OrderDetailRepository");