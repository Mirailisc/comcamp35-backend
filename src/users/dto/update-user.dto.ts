import { ApiProperty } from '@nestjs/swagger'

export class UpdateUserDto {
  @ApiProperty({ example: 'John', nullable: true })
  first_name?: string

  @ApiProperty({ example: 'Doe', nullable: true })
  last_name?: string
}
