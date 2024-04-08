import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FinancialResource } from './domain/financial-resources.entity'
import { FinancialResourcesController } from './infrastructure/financial-resources.controller'
import { FinancialResourcesCrudService } from './application'

@Module({
  imports: [TypeOrmModule.forFeature([FinancialResource])],
  controllers: [FinancialResourcesController],
  providers: [FinancialResourcesCrudService]
})
export class FinancialResourcesModule {}
