import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { OutstandingCrudService } from '../application'
import { CreateOutstandingDto } from '../dto/create-outstanding.dto'
import { UpdateOutstandingDto } from '../dto/update-outstanding.dto'

@Controller('outstanding')
export class OutstandingController {
  constructor (private readonly outstandingCrudService: OutstandingCrudService) {}

  @Post()
  create (@Body() createOutstandingDto: CreateOutstandingDto) {
    return this.outstandingCrudService.create(createOutstandingDto)
  }

  @Get()
  findAll () {
    return this.outstandingCrudService.findAll()
  }

  @Get(':id')
  findOne (@Param('id') id: string) {
    return this.outstandingCrudService.findOne(+id)
  }

  @Patch(':id')
  update (@Param('id') id: string, @Body() updateOutstandingDto: UpdateOutstandingDto) {
    return this.outstandingCrudService.update(+id, updateOutstandingDto)
  }

  @Delete(':id')
  remove (@Param('id') id: string) {
    return this.outstandingCrudService.remove(+id)
  }
}
