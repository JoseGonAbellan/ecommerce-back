import { Body, Controller, Param, Put } from "@nestjs/common";
import { User, UserPropierties } from "../../../domain/entities/user.entity";
import { UpdateUserUseCase } from "../../../application/uses-cases/update-user.use-case";

@Controller("users")
export class UpdateUserController{
    constructor(private readonly updateUserUseCase: UpdateUserUseCase){}
    @Put(":id")
    async update(@Param("id") id: number, @Body() user: UserPropierties): Promise<UserPropierties>{
        return await this.updateUserUseCase.execute(id, user)
    }
}