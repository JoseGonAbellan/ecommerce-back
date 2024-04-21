// database.module.ts
import { Module } from '@nestjs/common';
import { DatabaseService } from './connector.database';


@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}