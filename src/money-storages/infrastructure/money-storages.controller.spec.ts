import { Test, type TestingModule } from '@nestjs/testing'
import { MoneyStoragesController } from './money-storages.controller'
import { MoneyStoragesCrudService } from '../application'

describe('MoneyStoragesController', () => {
  let controller: MoneyStoragesController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoneyStoragesController],
      providers: [MoneyStoragesCrudService]
    }).compile()

    controller = module.get<MoneyStoragesController>(MoneyStoragesController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
