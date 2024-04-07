import { Inject, NotFoundException } from "@nestjs/common";
import { UserRepository, UserRepositoryToken } from "../../domain/contracts/users.repository";
import { User, UserPropierties } from "../../domain/entities/user.entity";
export class UpdateUserUseCase{
    constructor(@Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository){}
    async execute(id: number, user: UserPropierties): Promise<UserPropierties>{
        const existingUser = await this.userRepository.findById(id);
        if (!existingUser){
            throw new NotFoundException(`El usuario con id ${id} no existe`)
        }
        const userEntity = User.create(user);
        return await this.userRepository.updateUser(id, userEntity);
    }
}