import { Module } from '@nestjs/common';

import { DatabaseModule, LoggerModule } from '@app/common';

@Module({
  providers: [],
  exports: [],
  imports: [DatabaseModule, LoggerModule],
})
export class CommonModule {}
