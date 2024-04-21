import { Order, OrderPropierties } from "../entities/order.entity";


export interface OrderRepository {
    create(order: Order): Promise<OrderPropierties>;
    findById(orderId: number): Promise<OrderPropierties>;
    updateOrder(id: number, product: Order): Promise<OrderPropierties>;
    findAllByUserId(page: number, pageSize: number, userId: number, orderDate?: Date): Promise<OrderPropierties[]>;
    findAll(page: number, pageSize: number, oderId?: number): Promise<OrderPropierties[]>;
}
export const OrderRepositoryToken = Symbol("OrderRepository");