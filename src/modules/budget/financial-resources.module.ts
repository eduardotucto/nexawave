import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Budget } from '@/modules/budget/domain/budget.entity'
import { BudgetsController } from './infrastructure/budget.controller'
import { BudgetsCrudService } from './application'

@Module({
  imports: [TypeOrmModule.forFeature([Budget])],
  controllers: [BudgetsController],
  providers: [BudgetsCrudService],
  exports: [BudgetsCrudService]
})
export class BudgetsModule {}
