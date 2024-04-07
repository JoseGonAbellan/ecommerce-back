import { Body, Controller, Param, Post, Put } from "@nestjs/common";
import { CreateProductUseCase } from "../../../application/uses-cases/create-product.use-case";
import { Product, ProductPropierties } from "../../../domain/entities/product.entity";
import { UpdateProductUseCase } from "../../../application/uses-cases/update-product.use-case";

@Controller("products")
export class UpdateProductController{
    constructor(private readonly updateProductUseCase: UpdateProductUseCase){}
    @Put(":id")
    async update(@Param("id") id: number, @Body() product: ProductPropierties): Promise<ProductPropierties>{
        return await this.updateProductUseCase.execute(id, product)
    }
}