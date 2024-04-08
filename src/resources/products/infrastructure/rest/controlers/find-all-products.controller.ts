import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { FindAllProductsUseCase } from "../../../application/uses-cases/find-all-products.use-case";
import { Product, ProductPropierties } from "../../../domain/entities/product.entity";
import { FilterProducts } from "../../../domain/types/filter.interface";
import { RolesGuard } from "../../../../../common/infrastructure/rest/nest/roles.guard";
import { RolEnum } from "../../../../users/domain/entities/user.entity";

@Controller("products")
export class FindAllProductsController{
    constructor(private readonly findAllProductUseCase: FindAllProductsUseCase){}
    @Get()
    @UseGuards(new RolesGuard([RolEnum.ADMIN, RolEnum.USER]))
    async findAll(@Query('page') page: number, @Query('pageSize') pageSize: number, @Query('filter') filter?: FilterProducts): Promise<ProductPropierties[]>{
        return await this.findAllProductUseCase.execute(page, pageSize, filter)
    }
}