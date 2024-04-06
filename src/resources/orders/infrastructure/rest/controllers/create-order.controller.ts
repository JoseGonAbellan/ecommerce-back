import { Body, Controller, Post } from "@nestjs/common";
import { CreateOrderWorkflow, CreateWorkflowPropierties } from "../../../application/workflows/create-order.workflow";
import { Order, OrderPropierties } from "../../../domain/entities/order.entity";

@Controller("orders")
export class CreateOrderController{
    constructor(private readonly createOrderWorkflow: CreateOrderWorkflow){}
    @Post()
    async create(@Body() propierties: CreateWorkflowPropierties): Promise<OrderPropierties>{
        return await this.createOrderWorkflow.execute(propierties)
    }
}