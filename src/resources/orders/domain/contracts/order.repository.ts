import { Order, OrderPropierties } from "../entities/order.entity";


export interface OrderRepository{
    create(order: Order) : Promise<OrderPropierties>;
    findById(id: number) : Promise<OrderPropierties>;
    updateOrder(id: number, product: Order) : Promise<OrderPropierties>;
    findAll(page: number, pageSize: number, userId: number, orderDate?: Date) : Promise<OrderPropierties[]>;
}
export const OrderRepositoryToken = Symbol("OrderRepository");