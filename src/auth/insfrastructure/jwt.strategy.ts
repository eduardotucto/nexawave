import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { jwtConfig } from 'src/config/jwt.config'
import { ConfigService } from '@nestjs/config'
import { NanoIdValidationPipe } from 'src/nanoid-validation.pipe'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor (private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig(configService).secret
    })
  }

  async validate (payload: any) {
    await new NanoIdValidationPipe().transform(payload.id, { type: 'param', metatype: String })
    return { id: payload.id }
  }
}
