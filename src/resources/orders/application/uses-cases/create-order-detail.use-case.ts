import { Inject } from "@nestjs/common";
import { OrderRepository, OrderRepositoryToken } from "../../domain/contracts/order.repository";
import { Order, OrderPropierties } from "../../domain/entities/order.entity";
import { OrderDetailRepository, OrderDetailRepositoryToken } from "../../domain/contracts/order-detail.repository";
import { OrderDetail } from "../../domain/entities/order-detail.entity";

export class CreateOrderDetailUseCase{
    constructor(@Inject(OrderDetailRepositoryToken)
    private readonly orderDetailRepository: OrderDetailRepository){}
    async execute(input: OrderDetail): Promise<OrderDetail>{
        return await this.orderDetailRepository.create(input);
    }
}