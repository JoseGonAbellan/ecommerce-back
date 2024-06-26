import { Inject } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { UserRepository, UserRepositoryToken } from "../../domain/contracts/users.repository";
import { User, UserPropierties } from "../../domain/entities/user.entity";
export class CreateUserUseCase{
    constructor(@Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository){}
    async execute(input: UserPropierties): Promise<UserPropierties>{
        const codifyPass = await bcrypt.hash(input.userPassword, 10);
        const userEntity = User.create({...input,userPassword:codifyPass});
        return await this.userRepository.create(userEntity);
    }
}