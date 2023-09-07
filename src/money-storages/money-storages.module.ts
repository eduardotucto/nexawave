import { Module } from '@nestjs/common'
import { MoneyStoragesService } from './money-storages.service'
import { MoneyStoragesController } from './money-storages.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MoneyStorage } from './entities/money-storage.entity'

@Module({
  imports: [TypeOrmModule.forFeature([MoneyStorage])],
  controllers: [MoneyStoragesController],
  providers: [MoneyStoragesService]
})
export class MoneyStoragesModule {}
