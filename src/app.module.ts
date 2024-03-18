import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { FinancialResourcesModule } from './financial-resources/financial-resources.module'
import { DatabaseModule } from './config/database/database.module'
import { TransactionsModule } from './transactions/transactions.module'
import { OutstandingModule } from './outstanding/outstanding.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.development'
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    FinancialResourcesModule,
    TransactionsModule,
    OutstandingModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
