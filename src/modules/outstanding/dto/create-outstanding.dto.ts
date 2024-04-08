import { IsBoolean, IsDateString, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator'
import { EntryType } from '../domain/outstanding.entity'

export class CreateOutstandingDto {
  @IsNotEmpty({ message: 'Description is required.' })
  @IsString({ message: 'Description must be string' })
  @MaxLength(150, { message: 'Description is too long' })
    description: string

  @IsNotEmpty({ message: 'Amount is required.' })
  @IsNumber({ allowInfinity: false, maxDecimalPlaces: 2 }, { message: 'Amount must be a number with a maximum of 2 decimal places' })
    amount: number

  @IsOptional()
  @IsBoolean({ message: 'isCompleted must be boolean' })
    isCompleted: boolean

  @IsOptional()
  @IsDateString({ strict: true }, { message: 'DueDate must be a valid date.' })
    dueDate: Date

  @IsNotEmpty({ message: 'Type is required.' })
  @IsEnum(EntryType, { message: `Type must be one of: ${Object.values(EntryType).join(', ')}` })
    type: EntryType

  @IsBoolean({ message: 'isRecurring must be boolean' })
    isRecurring: boolean

  @IsOptional()
  @IsInt({ message: 'paymentDay must be a integer number' })
    paymentDay: number

  @IsOptional()
  @IsInt({ message: 'paymentDurationMonths must be a integer number' })
    paymentDurationMonths: number
}
