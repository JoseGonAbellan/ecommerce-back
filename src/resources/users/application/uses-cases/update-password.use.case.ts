import { Inject, NotFoundException, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { UserRepository, UserRepositoryToken } from "../../domain/contracts/users.repository";
import { UpdatePassInput, UserUpdatePassDTO } from "../../infrastructure/rest/dtos/update-user.dto";
export class UpdatePasswordUseCase {
    constructor(@Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository) { }
    async execute(id: number, user: UpdatePassInput): Promise<UserUpdatePassDTO> {

        const { email, newPassword, oldPassword } = user;
        const existingUser = await this.userRepository.findById(id);
        if (!existingUser) {
            throw new NotFoundException(`El usuario con id ${id} no existe`)
        }
        if (existingUser.userID !== id) {
            throw new UnauthorizedException("No tienes permisos para modificar este usuario")
        }

        const validatePass = await bcrypt.compare(oldPassword, existingUser.userPassword);

        if (!validatePass) {
            throw new UnauthorizedException("La contraseña antigua no es correcta")
        }

        const codifyPass = await bcrypt.hash(newPassword, 10);

        return await this.userRepository.updatePassword(id, {
            userEmail: email,
            userPassword: codifyPass
        });
    }
}