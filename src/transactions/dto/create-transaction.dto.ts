import { IsDateString, IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator'
export class CreateTransactionDto {
  @IsNotEmpty({ message: 'TransactionDate is required.' })
  @IsDateString({ strict: true }, { message: 'TransactionDate must be a valid date.' })
    transactionDate: Date

  @IsString({ message: 'Description must be string' })
  @MaxLength(150, { message: 'Description is too long' })
    description?: string

  @IsNotEmpty({ message: 'Amount is required.' })
  @IsNumber({ allowInfinity: false, maxDecimalPlaces: 2 }, { message: 'Amount must be a number with a maximum of 2 decimal places' })
    amount: number

  @IsNotEmpty({ message: 'FinancialResourceId is required.' })
    financialResourceId: string
}
