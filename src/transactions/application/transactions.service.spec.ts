import { Test, type TestingModule } from '@nestjs/testing'
import { TransactionsCrudService } from './'

describe('TransactionsService', () => {
  let service: TransactionsCrudService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionsCrudService]
    }).compile()

    service = module.get<TransactionsCrudService>(TransactionsCrudService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
