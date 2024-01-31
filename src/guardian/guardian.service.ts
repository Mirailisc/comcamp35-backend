import { Injectable, Logger } from '@nestjs/common'
import { CreateGuardianDto } from './dto/create-guardian.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class GuardianService {
  private logger: Logger = new Logger('Guardian')

  constructor(private prisma: PrismaService) {}

  async create(id: number, createGuardianDto: CreateGuardianDto) {
    this.logger.log(`User ID ${id} submitted guardian form`)
    return await this.prisma.guardian.upsert({
      where: { userId: id },
      create: { ...createGuardianDto, userId: id },
      update: { ...createGuardianDto, userId: id },
    })
  }

  async findOne(id: number) {
    return await this.prisma.guardian.findUnique({ where: { userId: id } })
  }
}
