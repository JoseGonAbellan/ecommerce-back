import { UserUpdatePassDTO } from "../../infrastructure/rest/dtos/update-user.dto";
import { User, UserPropierties } from "../entities/user.entity";

export interface UserRepository{
    create(user: User) : Promise<UserPropierties>
    delete(id: number) : Promise<void>
    findById(id: number) : Promise<UserPropierties>
    updateUser(id: number, user: User) : Promise<UserPropierties>
    findByEmail(email: string) : Promise<UserPropierties>
    updatePassword(id: number, user: UserUpdatePassDTO): Promise<UserUpdatePassDTO>
}
export const UserRepositoryToken = Symbol("UserRepository");