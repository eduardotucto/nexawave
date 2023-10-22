import { Injectable } from '@nestjs/common'
import { type CreateOutstandingDto } from '../dto/create-outstanding.dto'
import { type UpdateOutstandingDto } from '../dto/update-outstanding.dto'

@Injectable()
export class OutstandingCrudService {
  create (createOutstandingDto: CreateOutstandingDto) {
    return 'This action adds a new outstanding'
  }

  findAll () {
    return 'This action returns all outstanding'
  }

  findOne (id: number) {
    return `This action returns a #${id} outstanding`
  }

  update (id: number, updateOutstandingDto: UpdateOutstandingDto) {
    return `This action updates a #${id} outstanding`
  }

  remove (id: number) {
    return `This action removes a #${id} outstanding`
  }
}
