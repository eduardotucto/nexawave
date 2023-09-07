import { PartialType } from '@nestjs/mapped-types'
import { CreateMoneyStorageDto } from './create-money-storage.dto'

export class UpdateMoneyStorageDto extends PartialType(CreateMoneyStorageDto) {}
