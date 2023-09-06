import { type ConfigService } from '@nestjs/config'

export const jwtConfig = (configService: ConfigService) => ({
  global: true,
  secret: configService.get<string>('JWT_SECRET'),
  signOptions: { expiresIn: '7d' }
})
