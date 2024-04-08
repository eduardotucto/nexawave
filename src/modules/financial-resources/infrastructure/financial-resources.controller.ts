import { Controller, Get, Post, Body, Patch, Param, Delete, Req, ValidationPipe, UsePipes, UseGuards } from '@nestjs/common'
import { FinancialResourcesCrudService } from '../application'
import { NanoIdValidationPipe } from '@/nanoid-validation.pipe'
import { JwtAuthGuard } from '@/auth/infrastructure/jwt-auth.guard'
import { CreateFinancialResourceDto, UpdateFinancialResourceDto } from '../dto'

@Controller('financial-resources')
export class FinancialResourcesController {
  constructor (private readonly financialResourcesCrudService: FinancialResourcesCrudService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  create (@Body() createFinancialResourceDto: CreateFinancialResourceDto, @Req() req) {
    return this.financialResourcesCrudService.create(createFinancialResourceDto, req.user.id)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll (@Req() req) {
    return this.financialResourcesCrudService.findAll(req.user.id)
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne (@Param('id', NanoIdValidationPipe) id: string, @Req() req) {
    return this.financialResourcesCrudService.findOne(id, req.user.id)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update (@Param('id', NanoIdValidationPipe) id: string, @Body() updateFinancialResourceDto: UpdateFinancialResourceDto) {
    return this.financialResourcesCrudService.update(id, updateFinancialResourceDto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove (@Param('id', NanoIdValidationPipe) id: string) {
    return this.financialResourcesCrudService.remove(id)
  }
}
