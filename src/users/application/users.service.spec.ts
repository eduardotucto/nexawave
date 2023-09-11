import { Test, type TestingModule } from '@nestjs/testing'
import { UsersService } from './users.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../domain/user.entity'
import { DatabaseModule } from 'src/database/database.module'
import { ConfigModule, ConfigService } from '@nestjs/config'

describe('UsersService', () => {
  let service: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        TypeOrmModule.forFeature([User]),
        ConfigModule
      ],
      providers: [UsersService, ConfigService]
    }).compile()

    service = module.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
