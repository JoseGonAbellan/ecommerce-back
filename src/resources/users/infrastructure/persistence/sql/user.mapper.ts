import { User, UserPropierties } from "../../../domain/entities/user.entity";

export class UserMapper{
    static mapToDomain(row: any): User{
        return new User(
            row.UserID,
            row.UserName,
            row.LastName,
            row.Email,
            row.UserPassword,
            row.Address,
            row.Phone,
            row.Rol
        )
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