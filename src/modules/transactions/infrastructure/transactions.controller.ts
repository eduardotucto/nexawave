import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe, BadRequestException } from '@nestjs/common'
import { TransactionsCrudService } from '../application'
import { CreateTransactionDto } from '../dto/create-transaction.dto'
import { UpdateTransactionDto } from '../dto/update-transaction.dto'
import { JwtAuthGuard } from 'src/auth/infrastructure/jwt-auth.guard'
import { NanoIdValidationPipe } from 'src/nanoid-validation.pipe'

@Controller('transactions')
export class TransactionsController {
  constructor (private readonly transactionsCrudService: TransactionsCrudService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  create (@Body() createTransactionDto: CreateTransactionDto) {
    try {
      return this.transactionsCrudService.create(createTransactionDto)
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll () {
    return this.transactionsCrudService.findAll()
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne (@Param('id', NanoIdValidationPipe) id: string) {
    return this.transactionsCrudService.findOne(id)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update (@Param('id', NanoIdValidationPipe) id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionsCrudService.update(id, updateTransactionDto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove (@Param('id', NanoIdValidationPipe) id: string) {
    return this.transactionsCrudService.remove(id)
  }
}
