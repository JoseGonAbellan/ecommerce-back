import { Inject } from "@nestjs/common";
import { ProductRepository, ProductRepositoryToken } from "../../domain/contracts/products.repository";
import { Product, ProductPropierties } from "../../domain/entities/product.entity";

export class CreateProductUseCase{
    constructor(@Inject(ProductRepositoryToken)
    private readonly productRepository: ProductRepository){}
    async execute(input: ProductPropierties): Promise<Product>{
        const productEntity = Product.create(input);
        return await this.productRepository.create(productEntity);
    }
}