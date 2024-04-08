import { Controller, Delete, Param, UseGuards } from "@nestjs/common";
import { DeleteUserUseCase } from "../../../application/uses-cases/delete-user.use-case";
import { RolesGuard } from "../../../../../common/infrastructure/rest/nest/roles.guard";
import { RolEnum } from "../../../domain/entities/user.entity";


@Controller("users")
export class DeleteUserController{
    constructor(private readonly deleteUserUseCase: DeleteUserUseCase){}
    @Delete(":id")
    @UseGuards(new RolesGuard([RolEnum.ADMIN]))
    async delete(@Param("id") id: number): Promise<void>{
        return await this.deleteUserUseCase.execute(id)
    }
}