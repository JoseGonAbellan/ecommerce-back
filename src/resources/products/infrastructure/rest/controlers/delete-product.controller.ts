import { Body, Controller, Delete, Param, Post, UseGuards } from "@nestjs/common";
import { CreateProductUseCase } from "../../../application/uses-cases/create-product.use-case";
import { Product, ProductPropierties } from "../../../domain/entities/product.entity";
import { DeleteProductUseCase } from "../../../application/uses-cases/delete-product.use-case";
import { RolesGuard } from "../../../../../common/infrastructure/rest/nest/roles.guard";
import { RolEnum } from "../../../../users/domain/entities/user.entity";

@Controller("products")
export class DeleteProductController{
    constructor(private readonly deleteProductUseCase: DeleteProductUseCase){}
    @Delete(":id")
    @UseGuards(new RolesGuard([RolEnum.ADMIN]))
    async delete(@Param("id") id: number): Promise<void>{
        return await this.deleteProductUseCase.execute(id)
    }
}