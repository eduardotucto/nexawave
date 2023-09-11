import { Test, type TestingModule } from '@nestjs/testing'
import { MoneyStoragesController } from './money-storages.controller'
import { MoneyStoragesService } from '../application/money-storages.service'

describe('MoneyStoragesController', () => {
  let controller: MoneyStoragesController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoneyStoragesController],
      providers: [MoneyStoragesService]
    }).compile()

    controller = module.get<MoneyStoragesController>(MoneyStoragesController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
