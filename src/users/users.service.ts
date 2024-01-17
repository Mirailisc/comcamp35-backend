import { ConflictException, Injectable, Logger } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { User } from '@prisma/client'

@Injectable()
export class UsersService {
  private logger: Logger = new Logger('User')

  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (
      await this.prisma.user.findUnique({
        where: { email: createUserDto.email },
      })
    ) {
      throw new ConflictException('Email already exists')
    } else {
      this.logger.log(`User ${createUserDto.email} created`)
      return await this.prisma.user.create({ data: createUserDto })
    }
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany()
  }

  async findOneById(id: number): Promise<User> {
    return await this.prisma.user.findUnique({ where: { id } })
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.prisma.user.findUnique({ where: { email } })
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.prisma.user.update({ where: { id }, data: updateUserDto })
  }

  async remove(id: number): Promise<User> {
    return await this.prisma.user.delete({ where: { id } })
  }
}
