import { Body, Controller, Post } from "@nestjs/common";
import { CreateProductUseCase } from "../../../application/uses-cases/create-product.use-case";
import { Product, ProductPropierties } from "../../../domain/entities/product.entity";

@Controller("products")
export class CreateProductController{
    constructor(private readonly createProductUseCase: CreateProductUseCase){}
    @Post()
    async create(@Body() propierties: ProductPropierties): Promise<ProductPropierties>{
        return await this.createProductUseCase.execute(propierties)
    }
}