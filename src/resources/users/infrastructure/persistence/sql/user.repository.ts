import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "../../../../../common/infrastructure/persistance/sql/connector.database";
import { UserRepository } from "../../../domain/contracts/users.repository";
import { User, UserPropierties } from "../../../domain/entities/user.entity";
import { UserMapper } from "./user.mapper";

@Injectable()
export class SqlUserRepository implements UserRepository{
  private readonly tableName = "users";

 constructor(private readonly databaseService: DatabaseService) {}
    
    async create(user: User): Promise<UserPropierties> {
     try {
        const query = `
        INSERT INTO ${this.tableName} (userName, lastName, email, userPassword, address, phone, rol)
        VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const entity = UserMapper.toEntity(user);
       
      await this.databaseService.query(query,[entity.userName, entity.userLastName, entity.userEmail, entity.userPassword, entity.userAddress, entity.userPhone, entity.rol]);
      const result = await this.databaseService.query("SELECT LAST_INSERT_ID() as userId;");
        const userId = result[0][0].userId;
        entity.userID = userId;
      return entity;
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

    async findById(id: number): Promise<UserPropierties> {
      try {
         const query= `SELECT * FROM ${this.tableName} WHERE userID = ?`;
         const result = await this.databaseService.query(query, [id]) as any[][];
         const user = UserMapper.mapToDomain(result[0][0]);
         const userPrimitives = UserMapper.toEntity(user);
         return userPrimitives;
      } catch (error) {
         console.error("Error al obtener el usuario:", error);
         throw new NotFoundException(`No se ha encontrado el usuario con la id ${id}`);
      }
    }

    async updateUser(id: number, user: User): Promise<UserPropierties> {
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
        return entity;
      } catch (error) {
         console.error("Error al actualizar el usuario:", error);
         throw error;
      }
    }

     async findByEmail(email: string): Promise<UserPropierties> {
      try {
         const query= `SELECT * FROM ${this.tableName} WHERE email = ?`;
         const result = await this.databaseService.query(query, [email]) as any[][];
         const user = UserMapper.mapToDomain(result[0][0]);
         const userPrimitives = UserMapper.toEntity(user);
         return userPrimitives;
      } catch (error) {
         console.error("Error al obtener el usuario:", error);
         throw new NotFoundException(`No se ha encontrado el usuario con el email ${email}`);
      }
    }
}
