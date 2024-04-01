import { Controller, Get, Param } from "@nestjs/common";
import { User } from "../../../domain/entities/user.entity";
import { FindByIdUserUseCase } from "../../../application/uses-cases/find-byid-user.use-case";

@Controller("users")
export class FindByIdUserController{
    constructor(private readonly findByIdUserUseCase: FindByIdUserUseCase){}
    @Get(":id")
    async findById(@Param("id") id: number): Promise<User>{
        return await this.findByIdUserUseCase.execute(id)
    }
}