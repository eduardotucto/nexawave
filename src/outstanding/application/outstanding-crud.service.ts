import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { type CreateOutstandingDto } from '../dto/create-outstanding.dto'
import { type UpdateOutstandingDto } from '../dto/update-outstanding.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { EntryType, Outstanding } from '../domain/outstanding.entity'
import { Repository } from 'typeorm'

@Injectable()
export class OutstandingCrudService {
  constructor (@InjectRepository(Outstanding) private readonly outstandingRepository: Repository<Outstanding>) {}

  async create (createOutstandingDto: CreateOutstandingDto, userId: string) {
    const { description, type } = createOutstandingDto
    const outstandingFound = await this.outstandingRepository.findOne({ where: { description, userId, type } })
    if (outstandingFound) throw new HttpException(`${type === EntryType.DEBT ? 'Esta deuda' : 'Este cobro'} ya existe`, HttpStatus.CONFLICT)

    const newOutstanding = this.outstandingRepository.create({ userId, ...createOutstandingDto })
    return this.outstandingRepository.save(newOutstanding)
  }

  findAll (userId: string) {
    return this.outstandingRepository.find({
      where: { userId }
    })
  }

  async findOne (id: string, userId: string) {
    const outstandingFound = await this.outstandingRepository.findOne({ where: { id, userId } })
    if (!outstandingFound) throw new HttpException('Registro no encontrado', HttpStatus.CONFLICT)
    return outstandingFound
  }

  async update (id: string, updateOutstandingDto: UpdateOutstandingDto) {
    const res = await this.outstandingRepository.update({ id }, updateOutstandingDto)
    if (res.affected === 0) throw new HttpException('Registro no encontrado', HttpStatus.BAD_REQUEST)
    return res
  }

  async remove (id: string) {
    const res = await this.outstandingRepository.delete({ id })
    if (res.affected === 0) throw new HttpException('Registro no encontrado', HttpStatus.NOT_FOUND)
    return res
  }
}
