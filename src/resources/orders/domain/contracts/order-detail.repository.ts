import { OrderDetail, OrderDetailsPropierties } from "../entities/order-detail.entity";


export interface OrderDetailRepository{
    create(order: OrderDetail) : Promise<OrderDetailsPropierties>;
}
export const OrderDetailRepositoryToken = Symbol("OrderDetailRepository");