import { ApiProperty } from '@nestjs/swagger'

export class CreateEducationDto {
  @ApiProperty({ example: "King Mongkut's University of Technology Thonburi" })
  school_name: string

  @ApiProperty({ example: 'Computer Engineering' })
  major: string

  @ApiProperty({ example: "Bachelor's" })
  degree: string

  @ApiProperty({ example: '1.5' })
  gpax: string
}
