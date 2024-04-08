import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { Product, ProductPropierties } from "../../../domain/entities/product.entity";
import { FindAllProductsUseCase } from "../../../application/uses-cases/find-all-products.use-case";
import { FindByIdProductUseCase } from "../../../application/uses-cases/find-byid-product.use-case";
import { RolesGuard } from "../../../../../common/infrastructure/rest/nest/roles.guard";
import { RolEnum } from "../../../../users/domain/entities/user.entity";

@Controller("products")
export class FindByIdProductController{
    constructor(private readonly findByIdProductUseCase: FindByIdProductUseCase){}
    @Get(":id")
    @UseGuards(new RolesGuard([RolEnum.ADMIN, RolEnum.USER]))
    async findById(@Param("id") id: number): Promise<ProductPropierties>{
        return await this.findByIdProductUseCase.execute(id)
    }
}