import { Inject } from "@nestjs/common";
import { OrderRepository, OrderRepositoryToken } from "../../domain/contracts/order.repository";
import { OrderPropierties } from "../../domain/entities/order.entity";

export class FindAllOrdersUseCase {
    constructor(
        @Inject(OrderRepositoryToken)
        private readonly orderRepository: OrderRepository) { }
    async execute(page: number, pageSize: number, orderId?: number): Promise<OrderPropierties[]> {
        return await this.orderRepository.findAll(page, pageSize, orderId);
    }
}