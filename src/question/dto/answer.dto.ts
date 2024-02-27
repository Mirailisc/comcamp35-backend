import { ApiProperty } from '@nestjs/swagger'

export class AnswerDto {
  @ApiProperty({ example: 'racism' })
  answer_1: string

  @ApiProperty({ example: 'racism' })
  answer_2: string

  @ApiProperty({ example: 'racism' })
  answer_3: string

  @ApiProperty({ example: 'racism' })
  answer_4: string

  @ApiProperty({ example: 'racism' })
  answer_5: string

  @ApiProperty({ example: 'racism' })
  answer_6: string
}
