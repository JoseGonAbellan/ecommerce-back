import { User, UserPropierties } from "../entities/user.entity";

export interface UserRepository{
    create(product: User) : Promise<UserPropierties>
    delete(id: number) : Promise<void>
    findById(id: number) : Promise<UserPropierties>
    updateUser(id: number, product: User) : Promise<UserPropierties>
}
export const UserRepositoryToken = Symbol("UserRepository");