import { Injectable, Logger } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { AnswerDto } from './dto/answer.dto'

@Injectable()
export class QuestionService {
  private logger: Logger = new Logger('Guardian')

  constructor(private prisma: PrismaService) {}

  async create(id: number, answerDto: AnswerDto) {
    this.logger.log(`User ID ${id} submitted interview questions`)
    return await this.prisma.question.upsert({
      where: { userId: id },
      create: { ...answerDto, userId: id },
      update: { ...answerDto, userId: id },
    })
  }

  async findOne(id: number) {
    return await this.prisma.guardian.findUnique({ where: { userId: id } })
  }
}
