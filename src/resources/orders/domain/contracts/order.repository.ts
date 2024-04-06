import { Order } from "../entities/order.entity";


export interface OrderRepository{
    create(order: Order) : Promise<Order>;
    findById(id: number) : Promise<Order>;
    updateOrder(id: number, product: Order) : Promise<Order>;
    findAll(page: number, pageSize: number, userId: number, orderDate?: Date) : Promise<Order[]>;
}
export const OrderRepositoryToken = Symbol("OrderRepository");