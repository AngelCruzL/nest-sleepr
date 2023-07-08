import { Module } from '@nestjs/common';

import { ConfigModule, DatabaseModule } from '@app/common';

@Module({
  providers: [],
  exports: [],
  imports: [DatabaseModule, ConfigModule],
})
export class CommonModule {}
