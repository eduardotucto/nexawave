import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { AppService } from './app.service'
import { JwtAuthGuard } from './auth/insfrastructure/jwt-auth.guard'

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
    return this.appService.getProfile(req.user.id)
  }
}
