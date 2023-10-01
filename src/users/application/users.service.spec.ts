import { Test, type TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../domain/user.entity'
import { DatabaseModule } from 'src/config/database/database.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UsersCrudService } from './'

describe('UsersService', () => {
  let service: UsersCrudService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        TypeOrmModule.forFeature([User]),
        ConfigModule
      ],
      providers: [UsersCrudService, ConfigService]
    }).compile()

    service = module.get<UsersCrudService>(UsersCrudService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
