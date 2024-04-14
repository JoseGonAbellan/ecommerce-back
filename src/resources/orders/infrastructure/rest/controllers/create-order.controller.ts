import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { RolesGuard } from "../../../../../common/infrastructure/rest/nest/roles.guard";
import { RolEnum } from "../../../../users/domain/entities/user.entity";
import { CreateOrderWorkflow, CreateWorkflowPropierties } from "../../../application/workflows/create-order.workflow";
import { OrderPropierties } from "../../../domain/entities/order.entity";

@Controller("orders")
export class CreateOrderController{
    constructor(private readonly createOrderWorkflow: CreateOrderWorkflow){}
    @Post()
    @UseGuards(new RolesGuard([RolEnum.ADMIN, RolEnum.USER, ],))
    async create(@Body() propierties: CreateWorkflowPropierties): Promise<OrderPropierties>{
        return await this.createOrderWorkflow.execute(propierties)
    }
}