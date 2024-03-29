import { Inject } from "@nestjs/common";
import { ProductRepository, ProductRepositoryToken } from "../../domain/contracts/products.repository";
import { Product, ProductPropierties } from "../../domain/entities/product.entity";

export class FindByIdProductUseCase{
    constructor(
    @Inject(ProductRepositoryToken)
    private readonly productRepository: ProductRepository){}
    async execute(id: number): Promise<Product>{
        return await this.productRepository.findById(id);
    }
}