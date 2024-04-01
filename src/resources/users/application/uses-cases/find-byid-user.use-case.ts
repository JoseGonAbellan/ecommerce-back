import { Inject } from "@nestjs/common";
import { UserRepository, UserRepositoryToken } from "../../domain/contracts/users.repository";
import { User } from "../../domain/entities/user.entity";

export class FindByIdUserUseCase{
    constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository){}
    async execute(id: number): Promise<User>{
        return await this.userRepository.findById(id);
    }
}