import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { RolesGuard } from "../../../../../common/infrastructure/rest/nest/roles.guard";
import { RolEnum } from "../../../../users/domain/entities/user.entity";
import { FindAllOrdersByUserUseCase } from "../../../application/uses-cases/find-all-orders-by-user.use-case";
import { OrderPropierties } from "../../../domain/entities/order.entity";

@Controller("orders/user")
export class FindAllOrdersByUserController {
    constructor(private readonly findAllOrdersByUserUseCase: FindAllOrdersByUserUseCase) { }
    @Get()
    @UseGuards(new RolesGuard([RolEnum.ADMIN, RolEnum.USER]))
    async create(@Query('page') page: number, @Query('pageSize') pageSize: number, @Query('userId') userId: number, @Query('orderDate') orderDate?: Date): Promise<OrderPropierties[]> {
        return await this.findAllOrdersByUserUseCase.execute(page, pageSize, userId, orderDate)
    }
}