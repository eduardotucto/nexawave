import { Test, type TestingModule } from '@nestjs/testing'
import { MoneyStoragesService } from './money-storages.service'

describe('MoneyStoragesService', () => {
  let service: MoneyStoragesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoneyStoragesService]
    }).compile()

    service = module.get<MoneyStoragesService>(MoneyStoragesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
