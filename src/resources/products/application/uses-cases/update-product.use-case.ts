import { Inject, NotFoundException } from "@nestjs/common";
import { ProductRepository, ProductRepositoryToken } from "../../domain/contracts/products.repository";
import { Product, ProductPropierties } from "../../domain/entities/product.entity";

export class UpdateProductUseCase{
    constructor(@Inject(ProductRepositoryToken)
    private readonly productRepository: ProductRepository){}
    async execute(id: number, product: ProductPropierties): Promise<ProductPropierties>{
        const existingProduct = await this.productRepository.findById(id);
        if (!existingProduct){
            throw new NotFoundException(`El producto con id ${id} no existe`)
        }
        const productEntity = Product.create(product);
        return await this.productRepository.updateProduct(id, productEntity);
    }
}