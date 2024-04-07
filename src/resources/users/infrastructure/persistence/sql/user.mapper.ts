import { User, UserPropierties } from "../../../domain/entities/user.entity";

export class UserMapper{
    static mapToDomain(row: any): User{
        return User.create({
            userID: row.UserID,
            userName: row.UserName,
            userLastName: row.LastName,
            userEmail: row.Email,
            userPassword: row.UserPassword,
            userAddress: row.Address,
            userPhone: row.Phone,
            rol: row.Rol
        })
    }
    static toEntity(user: User): UserPropierties{ 
        return { 
            userID: user.userID,
            userName: user.userName.getValue(),
            userLastName: user.userLastName.getValue(),
            userEmail: user.userEmail.getValue(),
            userPassword: user.userPassword.getValue(),
            userAddress: user.userAddress.getValue(),
            userPhone: user.userPhone.getValue(),
            rol: user.rol.getValue()
        }
    }
}