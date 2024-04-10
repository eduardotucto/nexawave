import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SeedService } from '@/seed/seed.service'
import { UsersModule } from '@/modules/users/users.module'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from '@/auth/auth.module'
import { FinancialResourcesModule } from '@/modules/financial-resources/financial-resources.module'
import { DatabaseModule } from '@/config/database/database.module'
import { TransactionsModule } from '@/modules/transactions/transactions.module'
import { OutstandingModule } from '@/modules/outstanding/outstanding.module'

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
  providers: [AppService, SeedService]
})
export class AppModule {}
