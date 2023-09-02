import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import * as path from 'path'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development'
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('PGHOST'),
        port: 5432,
        username: configService.get('PGUSER'),
        password: configService.get('PGPASSWORD'),
        database: configService.get('PGDATABASE'),
        entities: [path.join(__dirname, '**', '*.entity{.ts,.js}')], // para que cargue automáticamente todos las entidades
        synchronize: true,
        logging: true,
        // esto sería el sslmode=require. Qué se yo (?) xd pero si no lo pongo me da error
        ssl: true
      }),
      inject: [ConfigService]
    }),
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
