import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserUseCase } from "../../../application/uses-cases/create-user.use-case";
import { UserPropierties } from "../../../domain/entities/user.entity";

@Controller("users")
export class CreateUserController{
    constructor(private readonly createUserUseCase: CreateUserUseCase){}
    @Post()
    async create(@Body() propierties: UserPropierties): Promise<UserPropierties>{
        return await this.createUserUseCase.execute(propierties)
    }
}