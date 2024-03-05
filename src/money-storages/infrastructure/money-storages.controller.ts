import { Controller, Get, Post, Body, Patch, Param, Delete, Req, ValidationPipe, UsePipes, UseGuards } from '@nestjs/common'
import { MoneyStoragesCrudService } from '../application'
import { CreateMoneyStorageDto } from '../dto/create-money-storage.dto'
import { UpdateMoneyStorageDto } from '../dto/update-money-storage.dto'
import { NanoIdValidationPipe } from 'src/nanoid-validation.pipe'
import { JwtAuthGuard } from 'src/auth/infrastructure/jwt-auth.guard'

@Controller('money-storages')
export class MoneyStoragesController {
  constructor (private readonly moneyStoragesCrudService: MoneyStoragesCrudService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  create (@Body() createMoneyStorageDto: CreateMoneyStorageDto, @Req() req) {
    return this.moneyStoragesCrudService.create(createMoneyStorageDto, req.user.id)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll (@Req() req) {
    return this.moneyStoragesCrudService.findAll(req.user.id)
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne (@Param('id', NanoIdValidationPipe) id: string, @Req() req) {
    return this.moneyStoragesCrudService.findOne(id, req.user.id)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update (@Param('id', NanoIdValidationPipe) id: string, @Body() updateMoneyStorageDto: UpdateMoneyStorageDto) {
    return this.moneyStoragesCrudService.update(id, updateMoneyStorageDto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove (@Param('id', NanoIdValidationPipe) id: string) {
    return this.moneyStoragesCrudService.remove(id)
  }
}
