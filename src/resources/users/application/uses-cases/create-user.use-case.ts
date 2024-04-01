import { Inject } from "@nestjs/common";
import { UserRepository, UserRepositoryToken } from "../../domain/contracts/users.repository";
import { User, UserPropierties } from "../../domain/entities/user.entity";

export class CreateUserUseCase{
    constructor(@Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository){}
    async execute(input: UserPropierties): Promise<User>{
        const userEntity = User.create(input);
        return await this.userRepository.create(userEntity);
    }
}