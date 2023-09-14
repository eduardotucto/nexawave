import { IsBoolean, IsEnum, IsNotEmpty, IsNumber } from 'class-validator'

enum StorageTypeEnum {
  Debit = 'Debit',
  Credit = 'Credit',
  Cash = 'Cash',
  Investment = 'Investment',
  Other = 'Other',
}

export class CreateMoneyStorageDto {
  @IsNotEmpty({ message: "Field 'label' is required." })
    label: string

  @IsNotEmpty({ message: "Field 'type' is required." })
  @IsEnum(StorageTypeEnum, { message: `Field 'type' must be one of: ${Object.values(StorageTypeEnum).join(', ')}` })
    type: StorageTypeEnum

  @IsNumber({ allowInfinity: false, maxDecimalPlaces: 2 }, { message: "Field 'balance' must be a number with a maximum of 2 decimal places" })
    balance: number

  @IsBoolean({ message: "Field 'contribution' must be boolean" })
    contribution: boolean
}
