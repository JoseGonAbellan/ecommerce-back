import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CreateProductUseCase } from "../../../application/uses-cases/create-product.use-case";
import { Product, ProductPropierties } from "../../../domain/entities/product.entity";
import { RolesGuard } from "../../../../../common/infrastructure/rest/nest/roles.guard";
import { RolEnum } from "../../../../users/domain/entities/user.entity";


@Controller("products")
export class CreateProductController{
    constructor(private readonly createProductUseCase: CreateProductUseCase){}
    @Post()
    @UseGuards(new RolesGuard([RolEnum.ADMIN]))
    async create(@Body() propierties: ProductPropierties): Promise<ProductPropierties>{
        return await this.createProductUseCase.execute(propierties)
    }
}