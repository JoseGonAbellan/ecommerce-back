import { Product, ProductPropierties } from "../entities/product.entity";
import { FilterProducts } from "../types/filter.interface";

export interface ProductRepository{
    create(product: Product) : Promise<ProductPropierties>
    delete(id: number) : Promise<void>
    findAll(page: number, pageSize: number, filter?: FilterProducts) : Promise<ProductPropierties[]>
    findById(id: number) : Promise<ProductPropierties>
    updateProduct(id: number, product: Product) : Promise<ProductPropierties>
}
export const ProductRepositoryToken = Symbol("ProductRepository");