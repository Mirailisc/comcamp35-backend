import { DocumentBuilder } from '@nestjs/swagger'

const limitShaVersion = 5

export const config = new DocumentBuilder()
  .setTitle('Comcamp 35 API')
  .setDescription('API for Comcamp 35')
  .setVersion(process.env.APP_VERSION.substring(0, limitShaVersion) ?? 'Dev')
  .build()
