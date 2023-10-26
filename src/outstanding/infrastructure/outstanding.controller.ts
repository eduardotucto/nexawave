import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UsePipes, ValidationPipe, UseGuards, Req } from '@nestjs/common'
import { OutstandingCrudService } from '../application'
import { CreateOutstandingDto } from '../dto/create-outstanding.dto'
import { UpdateOutstandingDto } from '../dto/update-outstanding.dto'
import { JwtAuthGuard } from 'src/auth/insfrastructure/jwt-auth.guard'

@Controller('outstanding')
export class OutstandingController {
  constructor (private readonly outstandingCrudService: OutstandingCrudService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  create (@Body() createOutstandingDto: CreateOutstandingDto, @Req() req) {
    try {
      return this.outstandingCrudService.create(createOutstandingDto, req.user.id)
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll (@Req() req) {
    return this.outstandingCrudService.findAll(req.user.id)
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne (@Param('id') id: string, @Req() req) {
    return this.outstandingCrudService.findOne(id, req.user.id)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update (@Param('id') id: string, @Body() updateOutstandingDto: UpdateOutstandingDto) {
    return this.outstandingCrudService.update(id, updateOutstandingDto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove (@Param('id') id: string) {
    return this.outstandingCrudService.remove(id)
  }
}
