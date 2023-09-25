import { Controller, Get, Post, Body, Patch, Param, Delete, Req, ValidationPipe, UsePipes, UseGuards } from '@nestjs/common'
import { MoneyStoragesService } from '../application/money-storages.service'
import { CreateMoneyStorageDto } from '../dto/create-money-storage.dto'
import { UpdateMoneyStorageDto } from '../dto/update-money-storage.dto'
import { NanoIdValidationPipe } from 'src/nanoid-validation.pipe'
import { JwtAuthGuard } from 'src/auth/insfrastructure/jwt-auth.guard'

@Controller('money-storages')
export class MoneyStoragesController {
  constructor (private readonly moneyStoragesService: MoneyStoragesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  create (@Body() createMoneyStorageDto: CreateMoneyStorageDto, @Req() req) {
    return this.moneyStoragesService.create(createMoneyStorageDto, req.user.id)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll (@Req() req) {
    return this.moneyStoragesService.findAll(req.user.id)
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne (@Param('id', NanoIdValidationPipe) id: string, @Req() req) {
    return this.moneyStoragesService.findOne(id, req.user.id)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update (@Param('id', NanoIdValidationPipe) id: string, @Body() updateMoneyStorageDto: UpdateMoneyStorageDto) {
    return this.moneyStoragesService.update(id, updateMoneyStorageDto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove (@Param('id', NanoIdValidationPipe) id: string) {
    return this.moneyStoragesService.remove(id)
  }
}
