import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UsePipes, ValidationPipe } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UUIDValidationPipe } from 'src/uuid-validation.pipe'

@Controller('users')
export class UsersController {
  constructor (private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create (@Body() createUserDto: CreateUserDto) {
    try {
      return this.usersService.create(createUserDto)
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }

  @Get()
  findAll () {
    return this.usersService.findAll()
  }

  @Get(':id')
  findOne (@Param('id', UUIDValidationPipe) id: string) {
    return this.usersService.findOne(id)
  }

  @Patch(':id')
  update (@Param('id', UUIDValidationPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  remove (@Param('id', UUIDValidationPipe) id: string) {
    return this.usersService.remove(id)
  }
}
