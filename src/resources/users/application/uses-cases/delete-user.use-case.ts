import { Inject, NotFoundException } from "@nestjs/common";
import { UserRepository, UserRepositoryToken } from "../../domain/contracts/users.repository";

export class DeleteUserUseCase{
    constructor(@Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository){}
    async execute(id: number): Promise<void>{
        const existingUser = await this.userRepository.findById(id);
        if (!existingUser){
            throw new NotFoundException(`El usuario con id ${id} no existe`)
        }
        return await this.userRepository.delete(id);
    }
}