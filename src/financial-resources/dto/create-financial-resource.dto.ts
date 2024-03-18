import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator'

enum StorageTypeEnum {
  Cash = 'Cash',
  BankAccount = 'Bank account',
  Credit = 'Credit',
  Other = 'Other'
}

export class CreateFinancialResourceDto {
  @IsNotEmpty({ message: 'Label is required.' })
  @IsString({ message: 'Label must be string' })
  @MaxLength(50, { message: 'Label is too long' })
    label: string

  @IsNotEmpty({ message: 'Type is required.' })
  @IsEnum(StorageTypeEnum, { message: `Type must be one of: ${Object.values(StorageTypeEnum).join(', ')}` })
    type: StorageTypeEnum

  @IsNotEmpty({ message: 'Currency is required.' })
  @IsString({ message: 'Currency must be string' })
  @MaxLength(3, { message: 'Currency is too long' })
    currency: string

  @IsNumber({ allowInfinity: false, maxDecimalPlaces: 2 }, { message: 'Balance must be a number with a maximum of 2 decimal places' })
    balance: number

  @IsBoolean({ message: 'Contribution must be boolean' })
    contribution: boolean
}
