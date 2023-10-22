import { Test, type TestingModule } from '@nestjs/testing'
import { OutstandingController } from './outstanding.controller'
import { OutstandingCrudService } from '../application'

describe('OutstandingController', () => {
  let controller: OutstandingController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OutstandingController],
      providers: [OutstandingCrudService]
    }).compile()

    controller = module.get<OutstandingController>(OutstandingController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
