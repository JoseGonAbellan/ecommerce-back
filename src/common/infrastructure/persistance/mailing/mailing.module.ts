// database.module.ts
import { Module } from '@nestjs/common';
import { EmailService } from './mailing';



@Module({
  providers: [EmailService],
  exports: [EmailService],
})
export class MailingModule {}