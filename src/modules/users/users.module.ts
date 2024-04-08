import { Module } from '@nestjs/common'
import { UsersCrudService } from './application'
import { UsersController } from './infrastructure/users.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './domain/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersCrudService],
  exports: [UsersCrudService]
})
export class UsersModule {}
