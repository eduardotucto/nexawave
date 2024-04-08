import { PartialType } from '@nestjs/mapped-types'
import { CreateOutstandingDto } from './create-outstanding.dto'

export class UpdateOutstandingDto extends PartialType(CreateOutstandingDto) {}
