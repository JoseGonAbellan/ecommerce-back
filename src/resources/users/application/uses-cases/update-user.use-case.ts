import { Inject, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UserRepository, UserRepositoryToken } from "../../domain/contracts/users.repository";
import { User, UserPropierties } from "../../domain/entities/user.entity";
import * as bcrypt from 'bcrypt';
export class UpdateUserUseCase{
    constructor(@Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository){}
    async execute(id: number, user: UserPropierties): Promise<UserPropierties>{
        const existingUser = await this.userRepository.findById(id);
        if (!existingUser){
            throw new NotFoundException(`El usuario con id ${id} no existe`)
        } 
        if (existingUser.userID !== id){
            throw new UnauthorizedException("No tienes permisos para updatear este usuario")
        }
        const codifyPass = await bcrypt.hash(user.userPassword, 10);
        const userEntity = User.create({...user,userPassword:codifyPass});
        return await this.userRepository.updateUser(id, userEntity);
    }
}