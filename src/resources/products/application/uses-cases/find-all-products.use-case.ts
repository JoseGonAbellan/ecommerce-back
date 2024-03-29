import { Inject } from "@nestjs/common";
import { ProductRepository, ProductRepositoryToken } from "../../domain/contracts/products.repository";
import { Product, ProductPropierties } from "../../domain/entities/product.entity";
import { FilterProducts } from "../../domain/types/filter.interface";

export class FindAllProductsUseCase{
    constructor(
    @Inject(ProductRepositoryToken)
    private readonly productRepository: ProductRepository){}
    async execute(page: number, pageSize: number, filter?: FilterProducts): Promise<Product[]>{
        return await this.productRepository.findAll(page, pageSize, filter);
    }
}