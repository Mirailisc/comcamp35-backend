import { ApiProperty } from '@nestjs/swagger'

export class UploadFileDto {
  @ApiProperty({ type: 'string' })
  type: string

  @ApiProperty({ type: 'string' })
  url: string
}
