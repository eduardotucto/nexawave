import { Module } from '@nestjs/common'
import { OutstandingCrudService } from './application'
import { OutstandingController } from './infrastructure/outstanding.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Outstanding } from './domain/outstanding.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Outstanding])],
  controllers: [OutstandingController],
  providers: [OutstandingCrudService]
})
export class OutstandingModule {}
