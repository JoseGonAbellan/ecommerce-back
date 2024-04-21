import { Body, Controller, Param, Put, UseGuards } from "@nestjs/common";
import { RolEnum, User, UserPropierties } from "../../../domain/entities/user.entity";
import { UpdateUserUseCase } from "../../../application/uses-cases/update-user.use-case";
import { RolesGuard } from "../../../../../common/infrastructure/rest/nest/roles.guard";
import { UpdatePassInput, UserUpdateDTO, UserUpdatePassDTO } from "../dtos/update-user.dto";
import { UpdatePasswordUseCase } from "../../../application/uses-cases/update-password.use.case";

@Controller("users/password")
export class UpdatePassController{
    constructor(private readonly updatePasswordUseCase: UpdatePasswordUseCase){}
    @Put(":id")
    @UseGuards(new RolesGuard([RolEnum.ADMIN, RolEnum.USER]))
    async update(@Param("id") id: number, @Body() user: UpdatePassInput): Promise<UserUpdatePassDTO>{
        return await this.updatePasswordUseCase.execute(id, user)
    }
}