import { Controller, Get, Param, Query } from "@nestjs/common";
import { FindAllOrdersUseCase } from "../../../application/uses-cases/find-all-orders.use-case";
import { OrderPropierties } from "../../../domain/entities/order.entity";
import { FindByIdOrderUseCase } from "../../../application/uses-cases/find-by-id-order.use-case";

@Controller("orders")
export class FindByIdOrderController{
    constructor(private readonly findByIdOrderUseCase: FindByIdOrderUseCase){}
    @Get(":id")
    async create(@Param("id") id: number, @Query('userId') userId: number): Promise<OrderPropierties>{
        return await this.findByIdOrderUseCase.execute(id, userId)
    }
}