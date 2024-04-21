import { Body, Controller, Param, Put, UseGuards } from "@nestjs/common";
import { RolEnum, User, UserPropierties } from "../../../domain/entities/user.entity";
import { UpdateUserUseCase } from "../../../application/uses-cases/update-user.use-case";
import { RolesGuard } from "../../../../../common/infrastructure/rest/nest/roles.guard";
import { UserUpdateDTO } from "../dtos/update-user.dto";

@Controller("users")
export class UpdateUserController{
    constructor(private readonly updateUserUseCase: UpdateUserUseCase){}
    @Put(":id")
    @UseGuards(new RolesGuard([RolEnum.ADMIN, RolEnum.USER]))
    async update(@Param("id") id: number, @Body() user: UserUpdateDTO): Promise<UserUpdateDTO>{
        return await this.updateUserUseCase.execute(id, user)
    }
}