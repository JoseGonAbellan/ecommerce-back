// database.module.ts
import { Module } from '@nestjs/common';
import { DatabaseService } from './connector.database';


@Module({
  providers: [DatabaseService],
  exports: [DatabaseService], // Exporta el servicio para que pueda ser utilizado en otros módulos
})
export class DatabaseModule {}