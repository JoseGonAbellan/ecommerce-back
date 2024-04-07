import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Product, ProductPropierties } from "../../../domain/entities/product.entity";
import { FindAllProductsUseCase } from "../../../application/uses-cases/find-all-products.use-case";
import { FindByIdProductUseCase } from "../../../application/uses-cases/find-byid-product.use-case";

@Controller("products")
export class FindByIdProductController{
    constructor(private readonly findByIdProductUseCase: FindByIdProductUseCase){}
    @Get(":id")
    async findById(@Param("id") id: number): Promise<ProductPropierties>{
        return await this.findByIdProductUseCase.execute(id)
    }
}