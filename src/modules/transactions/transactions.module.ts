import { Module } from '@nestjs/common'
import { TransactionsCrudService } from './application'
import { TransactionsController } from './infrastructure/transactions.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Transaction } from './domain/transaction.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  controllers: [TransactionsController],
  providers: [TransactionsCrudService],
  exports: [TransactionsCrudService]
})
export class TransactionsModule {}
