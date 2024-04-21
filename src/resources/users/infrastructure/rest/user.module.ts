import { Module } from '@nestjs/common';
import { MailingModule } from '../../../../common/infrastructure/persistance/mailing/mailing.module';
import { DatabaseModule } from '../../../../common/infrastructure/persistance/sql/database.module';
import { CreateUserUseCase } from '../../application/uses-cases/create-user.use-case';
import { DeleteUserUseCase } from '../../application/uses-cases/delete-user.use-case';
import { FindByIdUserUseCase } from '../../application/uses-cases/find-byid-user.use-case';
import { LoginUserUseCase } from '../../application/uses-cases/login-user.use-case';
import { ResetPasswordUseCase } from '../../application/uses-cases/reset-password.use-case';
import { UpdatePasswordUseCase } from '../../application/uses-cases/update-password.use.case';
import { UpdateUserUseCase } from '../../application/uses-cases/update-user.use-case';
import { UserRepositoryToken } from '../../domain/contracts/users.repository';
import { UserMapper } from '../persistence/sql/user.mapper';
import { SqlUserRepository } from '../persistence/sql/user.repository';
import { CreateUserController } from './controlers/create-user.controller';
import { DeleteUserController } from './controlers/delete-user.controller';
import { FindByIdUserController } from './controlers/find-by-id-user.controller';
import { LoginUserController } from './controlers/login-user.controller';
import { ResetPasswordController } from './controlers/reset-password.controller';
import { UpdatePassController } from './controlers/update-pass-user.controller';
import { UpdateUserController } from './controlers/update-user.controller';


@Module({
    imports:[DatabaseModule, MailingModule],
    controllers: [CreateUserController, DeleteUserController, FindByIdUserController, UpdateUserController, LoginUserController, UpdatePassController, ResetPasswordController],
    providers: [
      CreateUserUseCase,
      DeleteUserUseCase,
      FindByIdUserUseCase,
      UpdateUserUseCase,
      LoginUserUseCase,
      UpdatePasswordUseCase,
      ResetPasswordUseCase,
      {provide: UserRepositoryToken, useClass: SqlUserRepository},
      UserMapper,
      DatabaseModule
  ],
})
export class UserModule {}