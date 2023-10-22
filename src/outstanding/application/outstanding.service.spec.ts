import { Test, type TestingModule } from '@nestjs/testing'
import { OutstandingCrudService } from './'

describe('OutstandingCrudService', () => {
  let service: OutstandingCrudService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OutstandingCrudService]
    }).compile()

    service = module.get<OutstandingCrudService>(OutstandingCrudService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
