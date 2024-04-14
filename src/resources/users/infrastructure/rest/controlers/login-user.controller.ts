import { Body, Controller, Post } from "@nestjs/common";
import { LoginPropierties, LoginUserUseCase } from "../../../application/uses-cases/login-user.use-case";
import { UserPropierties } from "../../../domain/entities/user.entity";

@Controller("users")
export class LoginUserController{
    constructor(private readonly loginUserUseCase: LoginUserUseCase){}
    @Post("login")
    async login(@Body() credentials: LoginPropierties): Promise<UserPropierties>{
        return await this.loginUserUseCase.execute(credentials);
    }
}