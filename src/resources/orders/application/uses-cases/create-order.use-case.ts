import { Inject } from "@nestjs/common";
import { OrderRepository, OrderRepositoryToken } from "../../domain/contracts/order.repository";
import { Order, OrderPropierties } from "../../domain/entities/order.entity";

export class CreateOrderUseCase{
    constructor(@Inject(OrderRepositoryToken)
    private readonly orderRepository: OrderRepository){}
    async execute(input: Order): Promise<OrderPropierties>{

        
        return await this.orderRepository.create(input);
    }
}