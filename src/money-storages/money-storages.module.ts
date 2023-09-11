import { Module } from '@nestjs/common'
import { MoneyStoragesService } from './application/money-storages.service'
import { MoneyStoragesController } from './infrastructure/money-storages.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MoneyStorage } from './domain/money-storage.entity'

@Module({
  imports: [TypeOrmModule.forFeature([MoneyStorage])],
  controllers: [MoneyStoragesController],
  providers: [MoneyStoragesService]
})
export class MoneyStoragesModule {}
