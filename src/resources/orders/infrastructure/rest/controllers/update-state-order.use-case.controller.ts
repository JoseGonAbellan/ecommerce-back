import { Body, Controller, Param, Patch, UseGuards } from "@nestjs/common";
import { RolesGuard } from "../../../../../common/infrastructure/rest/nest/roles.guard";
import { RolEnum } from "../../../../users/domain/entities/user.entity";
import { UpdateOrderUseCase } from "../../../application/uses-cases/update-order.use-case";
import { OrderPropierties } from "../../../domain/entities/order.entity";

@Controller("orders")
export class UpdateOrderController {
    constructor(private readonly updateOrderUseCase: UpdateOrderUseCase) { }
    @Patch(":id")
    @UseGuards(new RolesGuard([RolEnum.ADMIN]))
    async create(@Param("id") id: number, @Body() order: OrderPropierties): Promise<OrderPropierties> {
        return await this.updateOrderUseCase.execute(id, order)
    }
}