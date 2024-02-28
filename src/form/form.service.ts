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

    this.logger.log(`User ID ${id} submitted general form`)

    try {
      await this.prisma.user.update({
        where: { id },
        data: {
          ...userData,
        },
      })

      const formDataByUser = await this.prisma.form.upsert({
        where: { userId: id },
        update: {
          tel: formDto.tel,
          address: formDto.address,
          travel: formDto.travel,
          shirt_size: formDto.shirt_size,
          can_bring_laptop: formDto.can_bring_laptop,
          food_allergy: formDto.food_allergy,
          special_food_needs: formDto.special_food_needs,
          disease: formDto.disease,
          personal_drug: formDto.personal_drug,
          drug_allergy: formDto.drug_allergy,
          insurance: formDto.insurance,
          birth_date: new Date(formDto.birth_date),
          userId: id,
        },
        create: {
          tel: formDto.tel,
          address: formDto.address,
          travel: formDto.travel,
          shirt_size: formDto.shirt_size,
          can_bring_laptop: formDto.can_bring_laptop,
          food_allergy: formDto.food_allergy,
          special_food_needs: formDto.special_food_needs,
          disease: formDto.disease,
          personal_drug: formDto.personal_drug,
          drug_allergy: formDto.drug_allergy,
          insurance: formDto.insurance,
          birth_date: new Date(formDto.birth_date),
          userId: id,
        },
      })

      return await this.findOne(formDataByUser.id)
    } catch (err) {
      this.logger.error(err.message)
    }
  }

  async findOne(id: number): Promise<Form> {
    return await this.prisma.form.findUnique({
      where: { userId: id },
    })
  }
}
