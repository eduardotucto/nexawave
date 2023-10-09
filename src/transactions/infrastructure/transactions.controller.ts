import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { TransactionsCrudService } from '../application'
import { CreateTransactionDto } from '../dto/create-transaction.dto'
import { UpdateTransactionDto } from '../dto/update-transaction.dto'

@Controller('transactions')
export class TransactionsController {
  constructor (private readonly transactionsCrudService: TransactionsCrudService) {}

  @Post()
  create (@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsCrudService.create(createTransactionDto)
  }

  @Get()
  findAll () {
    return this.transactionsCrudService.findAll()
  }

  @Get(':id')
  findOne (@Param('id') id: string) {
    return this.transactionsCrudService.findOne(+id)
  }

  @Patch(':id')
  update (@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionsCrudService.update(+id, updateTransactionDto)
  }

  @Delete(':id')
  remove (@Param('id') id: string) {
    return this.transactionsCrudService.remove(+id)
  }
}
