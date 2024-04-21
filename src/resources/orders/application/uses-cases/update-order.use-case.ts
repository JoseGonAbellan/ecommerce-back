import { Inject, NotFoundException } from "@nestjs/common";
import { OrderRepository, OrderRepositoryToken } from "../../domain/contracts/order.repository";
import { Order, OrderPropierties } from "../../domain/entities/order.entity";

export class UpdateOrderUseCase {
    constructor(@Inject(OrderRepositoryToken)
    private readonly orderRepository: OrderRepository) { }
    async execute(id: number, order: OrderPropierties): Promise<OrderPropierties> {
        const existingOrder = await this.orderRepository.findById(id);
        if (!existingOrder) {
            throw new NotFoundException(`El pedido con id ${id} no existe`)
        }
        const orderEntity = Order.create(order);

        return await this.orderRepository.updateOrder(id, orderEntity);
    }
}