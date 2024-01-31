import { Injectable, Logger } from '@nestjs/common'
import { CreateEducationDto } from './dto/create-education.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { Education } from '@prisma/client'

@Injectable()
export class EducationService {
  private logger: Logger = new Logger('Education')

  constructor(private prisma: PrismaService) {}

  async create(
    id: number,
    createEducationDto: CreateEducationDto,
  ): Promise<Education> {
    this.logger.log(`User ID ${id} submitted education form`)
    return await this.prisma.education.upsert({
      where: { userId: id },
      create: { ...createEducationDto, userId: id },
      update: { ...createEducationDto, userId: id },
    })
  }

  async findOne(id: number): Promise<Education> {
    return await this.prisma.education.findUnique({ where: { userId: id } })
  }
}
