import { Body, Controller, Delete, Param, Post } from "@nestjs/common";
import { CreateProductUseCase } from "../../../application/uses-cases/create-product.use-case";
import { Product, ProductPropierties } from "../../../domain/entities/product.entity";
import { DeleteProductUseCase } from "../../../application/uses-cases/delete-product.use-case";

@Controller("products")
export class DeleteProductController{
    constructor(private readonly deleteProductUseCase: DeleteProductUseCase){}
    @Delete(":id")
    async delete(@Param("id") id: number): Promise<void>{
        return await this.deleteProductUseCase.execute(id)
    }
}