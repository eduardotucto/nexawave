import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import { BudgetsCrudService } from '../application'
import { JwtAuthGuard } from '@/auth/infrastructure/jwt-auth.guard'
import { CreateBudgetDto, UpdateBudgetDto } from '../dto'
import { NanoIdValidationPipe } from '@/nanoid-validation.pipe'

@Controller('budgets')
export class BudgetsController {
  constructor (private readonly budgetsCrudService: BudgetsCrudService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  create (@Body() createBudgetDto: CreateBudgetDto, @Req() req) {
    return this.budgetsCrudService.create(createBudgetDto, req.user.id)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll (@Req() req) {
    return this.budgetsCrudService.findAll(req.user.id)
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne (@Param('id', NanoIdValidationPipe) id: string, @Req() req) {
    return this.budgetsCrudService.findOne(id, req.user.id)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update (@Param('id', NanoIdValidationPipe) id: string, @Body() updateBudgetDto: UpdateBudgetDto) {
    return this.budgetsCrudService.update(id, updateBudgetDto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove (@Param('id', NanoIdValidationPipe) id: string) {
    return this.budgetsCrudService.remove(id)
  }
}
