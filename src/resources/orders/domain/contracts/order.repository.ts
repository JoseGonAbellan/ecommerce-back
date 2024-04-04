import { Order } from "../entities/order.entity";


export interface OrderRepository{
    create(order: Order) : Promise<Order>;
    findById(id: number) : Promise<Order>;
    updateOrder(id: number, product: Order) : Promise<Order>;
}
export const OrderRepositoryToken = Symbol("OrderRepository");