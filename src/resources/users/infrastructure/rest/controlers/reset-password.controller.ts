import { Body, Controller, Post } from '@nestjs/common';
import { ResetPasswordUseCase } from '../../../application/uses-cases/reset-password.use-case';


@Controller('users/reset-password')
export class ResetPasswordController {
  constructor(private readonly resetPasswordUseCase: ResetPasswordUseCase) {}

  @Post()
  async resetPassword(@Body('email') email: string): Promise<void> {
  await this.resetPasswordUseCase.execute(email);
  }
}