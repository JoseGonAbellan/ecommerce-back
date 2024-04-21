import { Inject, NotFoundException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import * as randomstring from 'randomstring';
import { EmailService } from "../../../../common/infrastructure/persistance/mailing/mailing";
import { UserRepository, UserRepositoryToken } from "../../domain/contracts/users.repository";
export class ResetPasswordUseCase {
    constructor(@Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository,
        private readonly mailService: EmailService
    ) { }
    async execute(email: string): Promise<void> {

        const existingUser = await this.userRepository.findByEmail(email);

        if (!existingUser) {
            throw new NotFoundException(`El usuario con el email ${email} no existe`)
        }

        // se genera una contraseña aleatoria de 10 caracteres
        const randomPassword = randomstring.generate(10)
        // se codifica la contraseña para guardarla en base de datos
        const codifyPass = await bcrypt.hash(randomPassword, 10);

        await this.userRepository.updatePassword(existingUser.userID, {
            userEmail: email,
            userPassword: codifyPass
        });
        // se envía un email con la nueva contraseña solicitada
        await this.mailService.sendEmail(email, 'Cambio de contraseña', `Tu nueva contraseña es: ${randomPassword}. Recuerda que una vez entres puedes cambiar tu contraseña en mi perfil`);
    }
}