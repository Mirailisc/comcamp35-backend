import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({ example: 'example@example.com', nullable: false })
  email: string

  @ApiProperty({ example: 'John', nullable: true })
  first_name?: string

  @ApiProperty({ example: 'Doe', nullable: true })
  last_name?: string

  @ApiProperty({
    example: 'https://avatars.githubusercontent.com/u/45442561?v=4',
    nullable: true,
  })
  profile_url?: string
}
