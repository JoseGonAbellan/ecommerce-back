import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "../../../../../common/infrastructure/persistance/sql/connector.database";
import { UserRepository } from "../../../domain/contracts/users.repository";
import { User } from "../../../domain/entities/user.entity";
import { UserMapper } from "./user.mapper";

@Injectable()
export class SqlUserRepository implements UserRepository{
  private readonly tableName = "users";

 constructor(private readonly databaseService: DatabaseService) {}
    
    async create(user: User): Promise<User> {
     try {
        const query = `
        INSERT INTO ${this.tableName} (userName, lastName, email, userPassword, address, phone, rol)
        VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const entity = UserMapper.toEntity(user);
       
      await this.databaseService.query(query,[entity.userName, entity.userLastName, entity.userEmail, entity.userPassword, entity.userAddress, entity.userPhone, entity.rol]);
      return user;
     } catch (error) {
        console.error("Error al crear el usuario:", error);
        throw error;
     }   
    }

    async delete(id: number): Promise<void>{
      try {
         const query= `DELETE FROM ${this.tableName} WHERE userID = ?`;
         await this.databaseService.query(query,[id]);
      } catch (error) {
         console.error("Error al eliminar el usuario:", error);
        throw error;
      }
    }
    

//     async findAll(page: number=1, pageSize: number=5, filter?: FilterUsers): Promise<User[]> {
//       try {
//          const startIndex= (page-1) * pageSize;
//          let query= `SELECT * FROM ${this.tableName}`;
//          if(filter){
//             const filterConditions = Object.keys(filter).map(fieldName => {
//          if (fieldName === 'price') {
//             return `price <= ${filter[fieldName]}`;
//          } else {
//             return `${fieldName} LIKE '%${filter[fieldName]}%'`;
//          }
// });
//             const whereClause = filterConditions.join(' AND ');
//             query +=  ` WHERE ${whereClause}`;
//          }
//          query += ` LIMIT ?, ?`
//          const result = await this.databaseService.query(query, [startIndex,pageSize]) as any[][];
//          const products: Product[] = result[0].map((row:any)=>ProductMapper.mapToDomain(row))
//          console.log(query, "query")
//          return products;
//       } catch (error) {
//          console.error("Error al obtener los productos:", error);
//          throw error;
// }
//     }

    async findById(id: number): Promise<User> {
      try {
         const query= `SELECT * FROM ${this.tableName} WHERE userID = ?`;
         const result = await this.databaseService.query(query, [id]) as any[][];
         const user = UserMapper.mapToDomain(result[0][0]);
         return user;
      } catch (error) {
         console.error("Error al obtener el usuario:", error);
         throw new NotFoundException(`No se ha encontrado el usuario con la id ${id}`);
      }
    }

    async updateUser(id: number, user: User): Promise<User> {
      try {
         const query = `UPDATE ${this.tableName} 
                       SET userName = ?, 
                           lastName = ?, 
                           email = ?, 
                           userPassword = ?, 
                           address = ?, 
                           phone = ?,
                           rol = ? 
                       WHERE userID = ?`;
         const entity = UserMapper.toEntity(user);
        await this.databaseService.query(query, [
            entity.userName,
            entity.userLastName,
            entity.userEmail,
            entity.userPassword,
            entity.userAddress,
            entity.userPhone,
            entity.rol,
            id
        ]);
        return user;
      } catch (error) {
         console.error("Error al actualizar el usuario:", error);
         throw error;
      }
    }
}
