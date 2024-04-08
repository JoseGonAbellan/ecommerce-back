import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../../../common/infrastructure/persistance/sql/database.module';
import { CreateUserUseCase } from '../../application/uses-cases/create-user.use-case';
import { DeleteUserUseCase } from '../../application/uses-cases/delete-user.use-case';
import { FindByIdUserUseCase } from '../../application/uses-cases/find-byid-user.use-case';
import { LoginUserUseCase } from '../../application/uses-cases/login-user.use-case';
import { UpdateUserUseCase } from '../../application/uses-cases/update-user.use-case';
import { UserRepositoryToken } from '../../domain/contracts/users.repository';
import { UserMapper } from '../persistence/sql/user.mapper';
import { SqlUserRepository } from '../persistence/sql/user.repository';
import { CreateUserController } from './controlers/create-user.controller';
import { DeleteUserController } from './controlers/delete-user.controller';
import { FindByIdUserController } from './controlers/find-by-id-user.controller';
import { UpdateUserController } from './controlers/update-user.controller';
import { LoginUserController } from './controlers/login-user.controller';

@Module({
    imports:[DatabaseModule],
    controllers: [CreateUserController, DeleteUserController, FindByIdUserController, UpdateUserController, LoginUserController],
    providers: [
      CreateUserUseCase,
      DeleteUserUseCase,
      FindByIdUserUseCase,
      UpdateUserUseCase,
      LoginUserUseCase,
      {provide: UserRepositoryToken, useClass: SqlUserRepository},
      UserMapper,
      DatabaseModule
  ],
})
export class UserModule {}