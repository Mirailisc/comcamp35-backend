import { ApiProperty } from '@nestjs/swagger'

export class CreateFormDto {
  @ApiProperty({ example: 'Mr.' })
  prefix: string

  @ApiProperty({ example: 'Walter' })
  first_name: string

  @ApiProperty({ example: 'Hartwell', nullable: true, required: false })
  middle_name?: string

  @ApiProperty({ example: 'White' })
  last_name: string

  @ApiProperty({ example: 'Heisenberg' })
  nickname: string

  @ApiProperty({ example: new Date('2024/01/01') })
  birth_date: string

  @ApiProperty({ example: '1234567890' })
  tel: string

  @ApiProperty({ example: 'Phitsanulok' })
  address: string

  @ApiProperty({ example: 'Helicopter' })
  travel: string

  @ApiProperty({ example: 'L' })
  shirt_size: string

  @ApiProperty({ example: true })
  can_bring_laptop: boolean

  @ApiProperty({ example: 'dog', nullable: true, required: false })
  food_allergy?: string

  @ApiProperty({ example: 'meth', nullable: true, required: false })
  favorite_food?: string

  @ApiProperty({ example: 'cancer', nullable: true, required: false })
  disease?: string

  @ApiProperty({ example: 'pregnancy test', nullable: true, required: false })
  personal_drug?: string

  @ApiProperty({ example: 'dog', nullable: true, required: false })
  drug_allergy?: string

  @ApiProperty({ example: 'government' })
  insurance: string
}
