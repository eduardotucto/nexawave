import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { type CreateFinancialResourceDto } from '../dto/create-financial-resource.dto'
import { type UpdateFinancialResourceDto } from '../dto/update-financial-resource.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { FinancialResource } from '../domain/financial-resources.entity'

@Injectable()
export class FinancialResourcesCrudService {
  constructor (@InjectRepository(FinancialResource) private readonly financialResourceRepository: Repository<FinancialResource>) {}

  async create (createFinancialResourceDto: CreateFinancialResourceDto, userId: string) {
    const { label } = createFinancialResourceDto
    const financialResource = await this.financialResourceRepository.findOne({ where: { label, userId } })
    if (financialResource) throw new HttpException(`Financial resource '${label}' already exist`, HttpStatus.CONFLICT)

    const newFinancialResource = this.financialResourceRepository.create({ userId, ...createFinancialResourceDto })
    return this.financialResourceRepository.save(newFinancialResource)
  }

  findAll (userId: string) {
    return this.financialResourceRepository.find({
      where: { userId }
    })
  }

  async findOne (id: string, userId: string) {
    const financialResource = await this.financialResourceRepository.findOne({ where: { id, userId } })
    if (!financialResource) throw new HttpException('Financial resource not found', HttpStatus.NOT_FOUND)
    return financialResource
  }

  async update (id: string, updateFinancialResourceDto: UpdateFinancialResourceDto) {
    const res = await this.financialResourceRepository.update({ id }, updateFinancialResourceDto)
    if (res.affected === 0) throw new HttpException('Financial resource not found', HttpStatus.BAD_REQUEST)
    return res
  }

  async remove (id: string) {
    const res = await this.financialResourceRepository.delete({ id })
    if (res.affected === 0) throw new HttpException('Financial resource not found', HttpStatus.NOT_FOUND)
    return res
  }
}
