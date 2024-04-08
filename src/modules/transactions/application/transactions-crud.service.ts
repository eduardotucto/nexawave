import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { type CreateTransactionDto } from '../dto/create-transaction.dto'
import { type UpdateTransactionDto } from '../dto/update-transaction.dto'
import { Transaction } from '../domain/transaction.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class TransactionsCrudService {
  constructor (@InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>) {}

  create (createTransactionDto: CreateTransactionDto) {
    const transaction = this.transactionRepository.create(createTransactionDto)
    return this.transactionRepository.save(transaction)
  }

  findAll () {
    return 'This action returns all transactions'
  }

  async findOne (id: string) {
    const transactionFound = await this.transactionRepository.findOne({ where: { id } })
    if (!transactionFound) throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND)
    return transactionFound
  }

  async update (id: string, updateTransactionDto: UpdateTransactionDto) {
    const res = await this.transactionRepository.update({ id }, updateTransactionDto)
    if (res.affected === 0) throw new HttpException('Transaction not found', HttpStatus.BAD_REQUEST)
    return res
  }

  async remove (id: string) {
    const res = await this.transactionRepository.delete({ id })
    if (res.affected === 0) throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND)
    return res
  }
}
