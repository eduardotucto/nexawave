import * as bcrypt from 'bcrypt'
import { BadRequestException, Injectable } from '@nestjs/common'
import { UsersService } from '../../users/application/users.service'
import { type LoginFieldsDto } from '../dto/login-fields.dto'
import { type RegisterFieldsDto } from '../dto/register-fields.dto'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor (
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async signIn (loginFieldsDto: LoginFieldsDto) {
    const { email, password } = loginFieldsDto
    try {
      const { password: userPasword, ...userData } = await this.usersService.findOneByKey('email', email)
      const isMatch = await bcrypt.compare(password, userPasword)
      if (!isMatch) throw new Error('Password incorrect')
      const token = this.jwtService.sign({ id: userData.id })
      return {
        ...userData,
        access_token: token
      }
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }

  async signUp (registerFieldsDto: RegisterFieldsDto) {
    try {
      const saltOrRounds = 10
      const password = registerFieldsDto.password
      const hash = await bcrypt.hash(password, saltOrRounds)
      const userData = {
        ...registerFieldsDto,
        password: hash
      }
      const newUserCreated = await this.usersService.create(userData)
      const accessToken = await this.jwtService.signAsync({ id: newUserCreated.id })
      return {
        accessToken
      }
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }
}
