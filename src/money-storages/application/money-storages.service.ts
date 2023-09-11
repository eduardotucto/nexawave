import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { type CreateMoneyStorageDto } from '../dto/create-money-storage.dto'
import { type UpdateMoneyStorageDto } from '../dto/update-money-storage.dto'
import { MoneyStorage } from '../domain/money-storage.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class MoneyStoragesService {
  constructor (@InjectRepository(MoneyStorage) private readonly moneyStorageRepository: Repository<MoneyStorage>) {}

  async create (createMoneyStorageDto: CreateMoneyStorageDto, userId: string) {
    const { storage_name: storageName } = createMoneyStorageDto
    const moneyStorageFound = await this.moneyStorageRepository.findOne({ where: { storage_name: storageName, userId } })
    if (moneyStorageFound) throw new HttpException(`Money storage '${storageName}' already exist`, HttpStatus.CONFLICT)

    const newMoneyStorage = this.moneyStorageRepository.create({ userId, ...createMoneyStorageDto })
    return this.moneyStorageRepository.save(newMoneyStorage)
  }

  findAll (userId: string) {
    return this.moneyStorageRepository.find({
      where: { userId }
    })
  }

  async findOne (id: string, userId: string) {
    const moneyStorageFound = await this.moneyStorageRepository.findOne({ where: { id, userId } })
    if (!moneyStorageFound) throw new HttpException('Money storage not found', HttpStatus.NOT_FOUND)
    return moneyStorageFound
  }

  async update (id: string, updateMoneyStorageDto: UpdateMoneyStorageDto) {
    const res = await this.moneyStorageRepository.update({ id }, updateMoneyStorageDto)
    if (res.affected === 0) throw new HttpException('Money storage not found', HttpStatus.BAD_REQUEST)
    return res
  }

  async remove (id: string) {
    const res = await this.moneyStorageRepository.delete({ id })
    if (res.affected === 0) throw new HttpException('Money storage not found', HttpStatus.NOT_FOUND)
    return res
  }
}
