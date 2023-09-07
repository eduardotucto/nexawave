import { IsEnum, IsNotEmpty } from 'class-validator'

enum StorageTypeEnum {
  Debit = 'Debit',
  Credit = 'Credit',
  Cash = 'Cash',
  Investment = 'Investment',
  Other = 'Other',
}

export class CreateMoneyStorageDto {
  @IsNotEmpty({ message: 'Nombre necesario' })
    storage_name: string

  @IsEnum(StorageTypeEnum, { message: `storage_type debe ser uno de: ${Object.values(StorageTypeEnum).join(', ')}` })
    storage_type: StorageTypeEnum

  @IsNotEmpty({ message: 'Debe especificar si contribuye a la sumal total de dinero' })
    contribution: boolean
}
