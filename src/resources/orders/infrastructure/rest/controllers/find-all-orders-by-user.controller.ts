import { Controller, Get, Query } from "@nestjs/common";
import { FindAllOrdersUseCase } from "../../../application/uses-cases/find-all-orders.use-case";
import { OrderPropierties } from "../../../domain/entities/order.entity";

@Controller("orders")
export class FindAllOrdersByUserController{
    constructor(private readonly findAllOrdersUseCase: FindAllOrdersUseCase){}
    @Get()
    async create(@Query('page') page: number, @Query('pageSize') pageSize: number, @Query('userId') userId: number, @Query('orderDate') orderDate?: Date): Promise<OrderPropierties[]>{
        return await this.findAllOrdersUseCase.execute(page, pageSize,userId, orderDate)
    }
}