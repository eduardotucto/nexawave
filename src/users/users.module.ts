import { Module } from '@nestjs/common'
import { UsersService } from './application/users.service'
import { UsersController } from './infrastructure/users.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './domain/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
