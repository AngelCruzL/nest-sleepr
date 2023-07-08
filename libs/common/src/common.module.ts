import { Module } from '@nestjs/common';

import { ConfigModule, DatabaseModule, LoggerModule } from '@app/common';

@Module({
  providers: [],
  exports: [],
  imports: [DatabaseModule, ConfigModule, LoggerModule],
})
export class CommonModule {}
