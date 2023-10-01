import { Test, type TestingModule } from '@nestjs/testing'
import { MoneyStoragesCrudService } from './'

describe('MoneyStoragesService', () => {
  let service: MoneyStoragesCrudService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoneyStoragesCrudService]
    }).compile()

    service = module.get<MoneyStoragesCrudService>(MoneyStoragesCrudService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
