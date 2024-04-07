import { Inject, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { OrderRepository, OrderRepositoryToken } from "../../domain/contracts/order.repository";
import { Order, OrderPropierties } from "../../domain/entities/order.entity";

export class FindByIdOrderUseCase{
    constructor(
    @Inject(OrderRepositoryToken)
    private readonly orderRepository: OrderRepository){}
    async execute(orderId: number, userId: number): Promise<OrderPropierties>{
        const order = await this.orderRepository.findById(orderId);
        if (!order){
            throw new NotFoundException(`No se ha encontrado el pedido con la id ${orderId}`)
        }
        if (order.userId !== userId){
            throw new UnauthorizedException("No tienes permisos para ver este pedido")
        }
        return order;
    }
}