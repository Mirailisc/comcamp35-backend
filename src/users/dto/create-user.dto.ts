import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({ example: 'example@example.com', nullable: false })
  email: string

  @ApiProperty({ example: 'John', nullable: true })
  first_name?: string

  @ApiProperty({ example: 'Doe', nullable: true })
  last_name?: string
}
