import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as path from 'path'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('PG_HOST'),
        port: configService.getOrThrow('PG_PORT'),
        username: configService.getOrThrow('PG_USER'),
        password: configService.getOrThrow('PG_PASSWORD'),
        database: configService.getOrThrow('PG_DATABASE'),
        synchronize: true,
        autoLoadEntities: true,
        entities: [path.join(__dirname, '**', '*.entity{.ts,.js}')], // para que cargue automáticamente todos las entidades
        logging: false,
        // esto sería el sslmode=require. Qué se yo (?) xd pero si no lo pongo me da error
        ssl: true
      }),
      inject: [ConfigService]
    })
  ]
})
export class DatabaseModule {}
