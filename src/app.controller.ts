import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { AppService } from './app.service'
import { JwtAuthGuard } from './auth/jwt-auth.guard'

@Controller()
export class AppController {
  constructor (private readonly appService: AppService) {}

  @Get()
  getHello (): string {
    return this.appService.getHello()
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile (@Req() req) {
    console.log(req.user)
    return {
      msg: 'Solo deber verlo si estas autorizado',
      userId: req.user.id
    }
  }
}
