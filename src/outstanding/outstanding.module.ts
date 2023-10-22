import { Module } from '@nestjs/common'
import { OutstandingCrudService } from './application'
import { OutstandingController } from './infrastructure/outstanding.controller'

@Module({
  controllers: [OutstandingController],
  providers: [OutstandingCrudService]
})
export class OutstandingModule {}
