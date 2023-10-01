import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UsePipes, ValidationPipe } from '@nestjs/common'
import { UsersCrudService } from '../application'
import { CreateUserDto } from '../dto/create-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'
import { NanoIdValidationPipe } from 'src/nanoid-validation.pipe'

@Controller('users')
export class UsersController {
  constructor (private readonly usersCrudService: UsersCrudService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create (@Body() createUserDto: CreateUserDto) {
    try {
      return this.usersCrudService.create(createUserDto)
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }

  @Get()
  findAll () {
    return this.usersCrudService.findAll()
  }

  @Get(':id')
  findOne (@Param('id', NanoIdValidationPipe) id: string) {
    return this.usersCrudService.findOne(id)
  }

  @Patch(':id')
  update (@Param('id', NanoIdValidationPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersCrudService.update(id, updateUserDto)
  }

  @Delete(':id')
  remove (@Param('id', NanoIdValidationPipe) id: string) {
    return this.usersCrudService.remove(id)
  }
}
