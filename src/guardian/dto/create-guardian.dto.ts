import { ApiProperty } from '@nestjs/swagger'

export class CreateGuardianDto {
  @ApiProperty({ example: 'Joe Papa' })
  name: string

  @ApiProperty({ example: '0987654321' })
  tel: string

  @ApiProperty({ example: 'Sugar Daddy' })
  relation: string

  @ApiProperty({
    example: 'joe.papa@racism.moe',
    nullable: true,
    required: false,
  })
  email?: string

  @ApiProperty({ example: 'Joe Mama' })
  emergency_name: string

  @ApiProperty({ example: '0987654321' })
  emergency_tel: string

  @ApiProperty({ example: 'Sugar Mommy' })
  emergency_relation: string

  @ApiProperty({
    example: 'joe.mama@racism.moe',
    nullable: true,
    required: false,
  })
  emergency_email?: string
}
