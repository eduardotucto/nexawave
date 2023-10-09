import { Test, type TestingModule } from '@nestjs/testing'
import { TransactionsController } from './transactions.controller'
import { TransactionsCrudService } from '../application'

describe('TransactionsController', () => {
  let controller: TransactionsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [TransactionsCrudService]
    }).compile()

    controller = module.get<TransactionsController>(TransactionsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
