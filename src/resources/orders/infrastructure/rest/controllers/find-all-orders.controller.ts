import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { RolesGuard } from "../../../../../common/infrastructure/rest/nest/roles.guard";
import { RolEnum } from "../../../../users/domain/entities/user.entity";
import { FindAllOrdersByUserUseCase } from "../../../application/uses-cases/find-all-orders-by-user.use-case";
import { OrderPropierties } from "../../../domain/entities/order.entity";
import { FindAllOrdersUseCase } from "../../../application/uses-cases/find-all-orders.use-case";

@Controller("orders")
export class FindAllOrdersController {
    constructor(private readonly findAllOrdersUseCase: FindAllOrdersUseCase) { }
    @Get()
    @UseGuards(new RolesGuard([RolEnum.ADMIN, RolEnum.USER]))
    async create(@Query('page') page: number, @Query('pageSize') pageSize: number, @Query('orderId') orderId?: number): Promise<OrderPropierties[]> {
        return await this.findAllOrdersUseCase.execute(page, pageSize, orderId)
    }
}