import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { MoneyStoragesModule } from './money-storages/money-storages.module'
import { DatabaseModule } from './config/database/database.module'
import { TransactionsModule } from './transactions/transactions.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.development'
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    MoneyStoragesModule,
    TransactionsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
