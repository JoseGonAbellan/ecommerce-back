import { Product, ProductPropierties } from "../../../domain/entities/product.entity";

export class ProductMapper{
    static mapToDomain(row: any): Product{
        return new Product(
            row.ProductID,
            row.ProductName,
            row.ProductDescription,
            row.Price,
            row.Stock,
            row.ProductImageURL,
            row.ProductType
        )
    }
    static toEntity(product: Product): ProductPropierties{
        return { 
            productID: product.productID,
            productName: product.productName.getValue(),
            productDescription: product.productDescription.getValue(),
            price: product.price,
            stock: product.stock.getValue(),
            productImageURL: product.productImageURL.getValue(),
            productType: product.productType.getValue()
        }
    }
}