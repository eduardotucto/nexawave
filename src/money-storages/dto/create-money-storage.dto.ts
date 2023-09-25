import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator'

enum StorageTypeEnum {
  Debit = 'Debit',
  Credit = 'Credit',
  Cash = 'Cash',
  Investment = 'Investment',
  Other = 'Other',
}

export class CreateMoneyStorageDto {
  @IsNotEmpty({ message: 'Label is required.' })
  @IsString({ message: 'Label must be string' })
  @MaxLength(50, { message: 'Label is too long' })
    label: string

  @IsNotEmpty({ message: 'Type is required.' })
  @IsEnum(StorageTypeEnum, { message: `Type must be one of: ${Object.values(StorageTypeEnum).join(', ')}` })
    type: StorageTypeEnum

  @IsNumber({ allowInfinity: false, maxDecimalPlaces: 2 }, { message: 'Balance must be a number with a maximum of 2 decimal places' })
    balance: number

  @IsBoolean({ message: 'Contribution must be boolean' })
    contribution: boolean
}
