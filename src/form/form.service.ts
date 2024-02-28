import { Injectable, Logger } from '@nestjs/common'
import { CreateFormDto } from './dto/create-form.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { Form } from '@prisma/client'
import { omit, pick } from 'lodash'

@Injectable()
export class FormService {
  private logger: Logger = new Logger('Form')

  constructor(private prisma: PrismaService) {}

  async createOrUpdate(id: number, formDto: CreateFormDto): Promise<Form> {
    const userData = pick(formDto, [
      'first_name',
      'last_name',
      'middle_name',
      'nickname',
      'prefix',
    ])

    const formattedFormDto = omit(formDto, [
      'first_name',
      'last_name',
      'middle_name',
      'nickname',
      'prefix',
    ])

    this.logger.log(`User ID ${id} submitted general form`)

    try {
      const formDataByUser = await this.prisma.user.update({
        where: { id },
        data: {
          ...userData,
          Form: {
            upsert: {
              create: {
                ...formattedFormDto,
                birth_date: new Date(formattedFormDto.birth_date),
              },
              update: {
                ...formattedFormDto,
                birth_date: new Date(formattedFormDto.birth_date),
              },
            },
          },
        },
        include: { Form: true },
      })

      return await this.findOne(formDataByUser.id)
    } catch (err) {
      this.logger.error(err.message)
    }
  }

  async findOne(id: number): Promise<Form> {
    return await this.prisma.form.findUnique({
      where: { id },
    })
  }
}
