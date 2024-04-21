import { Inject, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UserRepository, UserRepositoryToken } from "../../domain/contracts/users.repository";
import { User } from "../../domain/entities/user.entity";
import { UserUpdateDTO } from "../../infrastructure/rest/dtos/update-user.dto";
export class UpdateUserUseCase{
    constructor(@Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository){}
    async execute(id: number, user: UserUpdateDTO): Promise<UserUpdateDTO>{
        const existingUser = await this.userRepository.findById(id);
        if (!existingUser){
            throw new NotFoundException(`El usuario con id ${id} no existe`)
        } 
        if (existingUser.userID !== id){
            throw new UnauthorizedException("No tienes permisos para modificar este usuario")
        }
       
        const userEntity = User.create(user);
        return await this.userRepository.updateUser(id, userEntity);
    }
}