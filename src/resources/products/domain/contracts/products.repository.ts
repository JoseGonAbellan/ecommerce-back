import { Product } from "../entities/product.entity";
import { FilterProducts } from "../types/filter.interface";

export interface ProductRepository{
    create(product: Product) : Promise<Product>
    delete(id: number) : Promise<void>
    findAll(page: number, pageSize: number, filter?: FilterProducts) : Promise<Product[]>
    findById(id: number) : Promise<Product>
    updateProduct(id: number, product: Product) : Promise<Product>
}
export const ProductRepositoryToken = Symbol("ProductRepository");