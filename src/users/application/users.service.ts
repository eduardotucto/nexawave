import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { type CreateUserDto } from '../dto/create-user.dto'
import { type UpdateUserDto } from '../dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../domain/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UsersService {
  constructor (@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async create (createUserDto: CreateUserDto) {
    const { email } = createUserDto
    const userFound = await this.userRepository.findOneBy({ email })
    if (userFound) throw new HttpException('User already exist', HttpStatus.CONFLICT)

    const newUser = this.userRepository.create(createUserDto)
    return this.userRepository.save(newUser)
  }

  findAll () {
    return this.userRepository.find()
  }

  async findOne (id: string) {
    const userFound = await this.userRepository.findOneBy({ id })
    if (!userFound) throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    return userFound
  }

  async findOneByKey (key: string, value: string) {
    const userFound = await this.userRepository.findOneBy({ [key]: value })
    if (!userFound) throw new Error('User not found')
    return userFound
  }

  async update (id: string, updateUserDto: UpdateUserDto) {
    const res = await this.userRepository.update({ id }, updateUserDto)
    if (res.affected === 0) throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
    return res
  }

  async remove (id: string) {
    const res = await this.userRepository.delete({ id })
    if (res.affected === 0) throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    return res
  }
}
