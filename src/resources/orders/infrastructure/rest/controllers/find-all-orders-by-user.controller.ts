import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { CreateOrderWorkflow, CreateWorkflowPropierties } from "../../../application/workflows/create-order.workflow";
import { Order } from "../../../domain/entities/order.entity";
import { query } from "express";
import { FindAllOrdersUseCase } from "../../../application/uses-cases/find-all-orders.use-case";

@Controller("orders")
export class FindAllOrdersByUserController{
    constructor(private readonly findAllOrdersUseCase: FindAllOrdersUseCase){}
    @Get()
    async create(@Query('page') page: number, @Query('pageSize') pageSize: number, @Query('userId') userId: number, @Query('orderDate') orderDate?: Date): Promise<Order[]>{
        return await this.findAllOrdersUseCase.execute(page, pageSize,userId, orderDate)
    }
}