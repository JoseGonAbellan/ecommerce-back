import { Inject } from "@nestjs/common";
import { OrderRepository, OrderRepositoryToken } from "../../domain/contracts/order.repository";
import { Order, OrderPropierties } from "../../domain/entities/order.entity";

export class FindAllOrdersUseCase{
    constructor(
    @Inject(OrderRepositoryToken)
    private readonly orderRepository: OrderRepository){}
    async execute(page: number, pageSize: number, userId: number, orderDate?: Date): Promise<OrderPropierties[]>{
        return await this.orderRepository.findAll(page, pageSize, userId, orderDate);
    }
}