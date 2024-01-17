import { DocumentBuilder } from '@nestjs/swagger'

export const config = new DocumentBuilder()
  .setTitle('Comcamp 35 API')
  .setDescription('API for Comcamp 35')
  .setVersion('0.0')
  .addTag('User')
  .addTag('File Upload')
  .build()
