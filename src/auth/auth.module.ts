import { Module } from '@nestjs/common'
import { AuthController } from './infrastructure/auth.controller'
import { AuthService } from './application/auth.service'
import { UsersModule } from 'src/users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './infrastructure/jwt.strategy'
import { ConfigService } from '@nestjs/config'
import { jwtConfig } from 'src/config/jwt.config'

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => jwtConfig(configService)
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
