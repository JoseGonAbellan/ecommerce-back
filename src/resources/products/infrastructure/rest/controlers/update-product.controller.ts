import { Body, Controller, Param, Post, Put, UseGuards } from "@nestjs/common";
import { CreateProductUseCase } from "../../../application/uses-cases/create-product.use-case";
import { Product, ProductPropierties } from "../../../domain/entities/product.entity";
import { UpdateProductUseCase } from "../../../application/uses-cases/update-product.use-case";
import { RolesGuard } from "../../../../../common/infrastructure/rest/nest/roles.guard";
import { RolEnum } from "../../../../users/domain/entities/user.entity";

@Controller("products")
export class UpdateProductController{
    constructor(private readonly updateProductUseCase: UpdateProductUseCase){}
    @Put(":id")
    @UseGuards(new RolesGuard([RolEnum.ADMIN]))
    async update(@Param("id") id: number, @Body() product: ProductPropierties): Promise<ProductPropierties>{
        return await this.updateProductUseCase.execute(id, product)
    }
}