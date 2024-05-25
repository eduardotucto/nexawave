import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator'

export class CreateBudgetDto {
  @IsString({ message: 'Label must be string' })
  @MaxLength(50, { message: 'Label is too long' })
    name: string

  @IsNumber({ allowInfinity: false, maxDecimalPlaces: 2 }, { message: 'Amount must be a number with a maximum of 2 decimal places' })
    amount: number

  // @IsOptional()
  // @IsString({ message: 'Color must be string' })
  //   color: string

  @IsOptional()
  @IsString({ message: 'BudgetId must be string' })
    budgetId?: string
}
