import { Controller, Get, Query } from "@nestjs/common";
import { FindAllProductsUseCase } from "../../../application/uses-cases/find-all-products.use-case";
import { ProductPropierties } from "../../../domain/entities/product.entity";
import { FilterProducts } from "../../../domain/types/filter.interface";

@Controller("products")
export class FindAllProductsController{
    constructor(private readonly findAllProductUseCase: FindAllProductsUseCase){}
    @Get()
    async findAll(@Query('page') page: number, @Query('pageSize') pageSize: number, @Query('filter') filter?: FilterProducts): Promise<ProductPropierties[]>{
        return await this.findAllProductUseCase.execute(page, pageSize, filter)
    }
}