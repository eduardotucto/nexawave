import { PartialType } from '@nestjs/mapped-types'
import { CreateFinancialResourceDto } from './create-financial-resource.dto'

export class UpdateFinancialResourceDto extends PartialType(CreateFinancialResourceDto) {}
