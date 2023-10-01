import { Module } from '@nestjs/common'
import { MoneyStoragesCrudService } from './application'
import { MoneyStoragesController } from './infrastructure/money-storages.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MoneyStorage } from './domain/money-storage.entity'

@Module({
  imports: [TypeOrmModule.forFeature([MoneyStorage])],
  controllers: [MoneyStoragesController],
  providers: [MoneyStoragesCrudService]
})
export class MoneyStoragesModule {}
