import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UsersCrudService } from './users/application'

@Injectable()
export class AppService {
  constructor (private readonly usersCrudService: UsersCrudService) {}

  getHello (): { msg: string } {
    return {
      msg: 'Hello World 6'
    }
  }

  getProfile (id: string) {
    try {
      return this.usersCrudService.findOneByIdWithItsFinancialResources(id)
    } catch (e) {
      throw new HttpException(e, HttpStatus.NOT_FOUND)
    }
  }
}
