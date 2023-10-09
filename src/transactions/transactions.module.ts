import { Module } from '@nestjs/common'
import { TransactionsCrudService } from './application'
import { TransactionsController } from './infrastructure/transactions.controller'

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsCrudService]
})
export class TransactionsModule {}
