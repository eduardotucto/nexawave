import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Budget } from '../domain/budget.entity'
import { Repository } from 'typeorm'
import { type UpdateBudgetDto, type CreateBudgetDto } from '../dto'

@Injectable()
export class BudgetsCrudService {
  constructor (@InjectRepository(Budget) private readonly budgetRepository: Repository<Budget>) {}

  create (createBudgetDto: CreateBudgetDto, userId: string) {
    const newBudget = this.budgetRepository.create({ userId, ...createBudgetDto })
    return this.budgetRepository.save(newBudget)
  }

  findAll (userId: string) {
    return this.budgetRepository.find({
      where: { userId }
    })
  }

  findOne (id: string, userId: string) {
    return this.budgetRepository.findOne({ where: { id, userId } })
  }

  async update (id: string, updateBudgetDto: UpdateBudgetDto) {
    const res = await this.budgetRepository.update({ id }, updateBudgetDto)
    if (res.affected === 0) throw new HttpException('Budget not found', HttpStatus.BAD_REQUEST)
    return res
  }

  async remove (id: string) {
    const res = await this.budgetRepository.delete({ id })
    if (res.affected === 0) throw new HttpException('Budget not found', HttpStatus.NOT_FOUND)
    return res
  }
}
