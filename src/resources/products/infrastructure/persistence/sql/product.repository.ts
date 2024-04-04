import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "../../../../../common/infrastructure/persistance/sql/connector.database";
import { ProductRepository } from "../../../domain/contracts/products.repository";
import { Product } from "../../../domain/entities/product.entity";
import { ProductMapper } from "./product.mapper";
import { FilterProducts } from "../../../domain/types/filter.interface";

@Injectable()
export class SqlProductRepository implements ProductRepository{
  private readonly tableName = "products";

 constructor(private readonly databaseService: DatabaseService) {}
    
    async create(product: Product): Promise<Product> {
     try {
        const query = `
        INSERT INTO ${this.tableName} (productName, productDescription, price, stock, productImageURL, productType)
        VALUES (?, ?, ?, ?, ?, ?)`;
        const entity = ProductMapper.toEntity(product);
       
      await this.databaseService.query(query,[entity.productName, entity.productDescription, entity.price, entity.stock, entity.productImageURL, entity.productType]);
      return product;
     } catch (error) {
        console.error("Error al crear el producto:", error);
        throw error;
     }   
    }

    async delete(id: number): Promise<void>{
      try {
         const query= `DELETE FROM ${this.tableName} WHERE productID = ?`;
         await this.databaseService.query(query,[id]);
      } catch (error) {
         console.error("Error al eliminar el producto:", error);
        throw error;
      }
    }
    

    async findAll(page: number=1, pageSize: number=5, filter?: FilterProducts): Promise<Product[]> {
      try {
         const startIndex= (page-1) * pageSize;
         let query= `SELECT * FROM ${this.tableName}`;
         if(filter){
            const filterConditions = Object.keys(filter).map(fieldName => {
         if (fieldName === 'price') {
            return `price <= ${filter[fieldName]}`;
         } else {
            return `${fieldName} LIKE '%${filter[fieldName]}%'`;
         }
});
            const whereClause = filterConditions.join(' AND ');
            query +=  ` WHERE ${whereClause}`;
         }
         query += ` LIMIT ?, ?`
         const result = await this.databaseService.query(query, [startIndex,pageSize]) as any[][];
         const products: Product[] = result[0].map((row:any)=>ProductMapper.mapToDomain(row))
         return products;
      } catch (error) {
         console.error("Error al obtener los productos:", error);
         throw error;
}
    }

    async findById(id: number): Promise<Product> {
      try {
         const query= `SELECT * FROM ${this.tableName} WHERE productID = ?`;
         const result = await this.databaseService.query(query, [id]) as any[][];
         const product = ProductMapper.mapToDomain(result[0][0]);
         return product;
      } catch (error) {
         console.error("Error al obtener el producto:", error);
         throw new NotFoundException(`No se ha encontrado el producto con la id ${id}`);
      }
    }

    async updateProduct(id: number, product: Product): Promise<Product> {
      try {
         const query = `UPDATE ${this.tableName} 
                       SET productName = ?, 
                           productDescription = ?, 
                           price = ?, 
                           stock = ?, 
                           productImageURL = ?,
                           productType = ? 
                       WHERE productID = ?`;
         const entity = ProductMapper.toEntity(product);
        await this.databaseService.query(query, [
            entity.productName,
            entity.productDescription,
            entity.price,
            entity.stock,
            entity.productImageURL,
            entity.productType,
            id
        ]);
        return product;
      } catch (error) {
         console.error("Error al actualizar el producto:", error);
         throw error;
      }
    }
}
