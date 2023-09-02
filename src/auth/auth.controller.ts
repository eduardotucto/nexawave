import { BadRequestException, Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterFieldsDto } from './dto/register-fields.dto'

@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true }))
  create (@Body() registerFieldsDto: RegisterFieldsDto) {
    try {
      return this.authService.signUp(registerFieldsDto)
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }
}
