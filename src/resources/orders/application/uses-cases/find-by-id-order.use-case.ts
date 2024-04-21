import { Inject, NotFoundException } from "@nestjs/common";
import { OrderRepository, OrderRepositoryToken } from "../../domain/contracts/order.repository";
import { OrderPropierties } from "../../domain/entities/order.entity";

export class FindByIdOrderUseCase {
    constructor(
        @Inject(OrderRepositoryToken)
        private readonly orderRepository: OrderRepository) { }
    async execute(orderId: number): Promise<OrderPropierties> {
        const order = await this.orderRepository.findById(orderId);
        if (!order) {
            throw new NotFoundException(`No se ha encontrado el pedido con la id ${orderId}`)
        }
        return order;
    }
}