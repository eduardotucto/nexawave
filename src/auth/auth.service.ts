import * as bcrypt from 'bcrypt'
import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { type LoginFieldsDto } from './dto/login-fields.dto'
import { type RegisterFieldsDto } from './dto/register-fields.dto'

@Injectable()
export class AuthService {
  constructor (private readonly usersService: UsersService) {}

  async signIn (loginFieldsDto: LoginFieldsDto) {}

  async signUp (registerFieldsDto: RegisterFieldsDto) {
    const saltOrRounds = 10
    const password = registerFieldsDto.password
    const hash = await bcrypt.hash(password, saltOrRounds)
    const userData = {
      ...registerFieldsDto,
      password: hash
    }
    return this.usersService.create(userData)
  }
}
