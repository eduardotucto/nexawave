import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UsersCrudService } from './users/application'

@Injectable()
export class AppService {
  constructor (private readonly usersCrudService: UsersCrudService) {}

  getHello (): string {
    return 'Hello World!'
  }

  getProfile (id: string) {
    try {
      return this.usersCrudService.findOneByIdWithItsMoneyStorages(id)
    } catch (e) {
      throw new HttpException(e, HttpStatus.NOT_FOUND)
    }
  }
}
