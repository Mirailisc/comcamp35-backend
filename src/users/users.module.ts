import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './dto/users.controller'
import { PrismaService } from 'src/prisma/prisma.service'

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}
