import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { RolesGuard } from "../../../../../common/infrastructure/rest/nest/roles.guard";
import { RolEnum } from "../../../../users/domain/entities/user.entity";
import { FindByIdOrderUseCase } from "../../../application/uses-cases/find-by-id-order.use-case";
import { OrderPropierties } from "../../../domain/entities/order.entity";

@Controller("orders")
export class FindByIdOrderController{
    constructor(private readonly findByIdOrderUseCase: FindByIdOrderUseCase){}
    @Get(":id")
    @UseGuards(new RolesGuard([RolEnum.ADMIN, RolEnum.USER]))
    async create(@Param("id") id: number, @Query('userId') userId: number): Promise<OrderPropierties>{
        return await this.findByIdOrderUseCase.execute(id, userId)
    }
}