import { Inject, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { UserRepository, UserRepositoryToken } from "../../domain/contracts/users.repository";
import { UserPropierties } from "../../domain/entities/user.entity";

export type LoginPropierties = {
    email: string,
    password: string
}
export class LoginUserUseCase{
    constructor(@Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository){}
    async execute(input: LoginPropierties): Promise<UserPropierties>{
        const {email, password} = input;
        const findUser = await this.userRepository.findByEmail(email);
        const validatePass = await bcrypt.compare(password, findUser.userPassword);
        if (!validatePass){
            throw new UnauthorizedException("La contraseña no es correcta")
        }
        return findUser;
    }
}