import { Inject, NotFoundException } from "@nestjs/common";
import { ProductRepository, ProductRepositoryToken } from "../../domain/contracts/products.repository";

export class DeleteProductUseCase{
    constructor(@Inject(ProductRepositoryToken)
    private readonly productRepository: ProductRepository){}
    async execute(id: number): Promise<void>{
        const existingProduct = await this.productRepository.findById(id);
        if (!existingProduct){
            throw new NotFoundException(`El producto con id ${id} no existe`)
        }
        return await this.productRepository.delete(id);
    }
}