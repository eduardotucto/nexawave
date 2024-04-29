import { PartialType } from '@nestjs/mapped-types'
import { CreateBudgetDto } from './create-budget.dto'
import { IsNumber, IsOptional } from 'class-validator'

export class UpdateBudgetDto extends PartialType(CreateBudgetDto) {
  @IsNumber({ allowInfinity: false, maxDecimalPlaces: 2 }, { message: 'Amount must be a number with a maximum of 2 decimal places' })
  @IsOptional()
    balance?: number
}
