import { Product, ProductPropierties } from "../../../domain/entities/product.entity";

export class ProductMapper{
    static mapToDomain(row: any): Product{
        const product = Product.create({
            productID: row.ProductID,
            productName: row.ProductName,
            productDescription: row.ProductDescription,
            price: row.Price,
            stock: row.Stock,
            productImageURL: row.ProductImageURL,
            productType: row.ProductType
        })
        return product
    }
    static toEntity(product: Product): ProductPropierties{
        return { 
            productID: product.productID,
            productName: product.productName.getValue(),
            productDescription: product.productDescription.getValue(),
            price: product.price.getValue(),
            stock: product.stock.getValue(),
            productImageURL: product.productImageURL.getValue(),
            productType: product.productType.getValue()
        }
    }
}