import { Controller, Delete, Param } from "@nestjs/common";
import { DeleteUserUseCase } from "../../../application/uses-cases/delete-user.use-case";


@Controller("users")
export class DeleteUserController{
    constructor(private readonly deleteUserUseCase: DeleteUserUseCase){}
    @Delete(":id")
    async delete(@Param("id") id: number): Promise<void>{
        return await this.deleteUserUseCase.execute(id)
    }
}