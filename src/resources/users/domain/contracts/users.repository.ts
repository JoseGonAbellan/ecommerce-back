import { User } from "../entities/user.entity";
import { FilterUsers } from "../types/filter.interface";

export interface UserRepository{
    create(product: User) : Promise<User>
    delete(id: number) : Promise<void>
    // findAll(page: number, pageSize: number, filter?: FilterUsers) : Promise<User[]>
    findById(id: number) : Promise<User>
    updateUser(id: number, product: User) : Promise<User>
}
export const UserRepositoryToken = Symbol("UserRepository");