import { LoginFieldsDto } from '../dto/login-fields.dto'
import { BadRequestException, Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { AuthService } from '../application/auth.service'
import { RegisterFieldsDto } from '../dto/register-fields.dto'

@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  login (@Body() loginFieldsDto: LoginFieldsDto) {
    try {
      return this.authService.signIn(loginFieldsDto)
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }

  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true }))
  register (@Body() registerFieldsDto: RegisterFieldsDto) {
    try {
      return this.authService.signUp(registerFieldsDto)
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }
}
