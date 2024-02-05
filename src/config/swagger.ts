import { DocumentBuilder } from '@nestjs/swagger'

const limitShaVersion = 8
const appVersion = process.env.APP_VERSION

export const config = new DocumentBuilder()
  .setTitle('Comcamp 35 API')
  .setDescription('API for Comcamp 35')
  .setVersion(appVersion ? appVersion.substring(0, limitShaVersion) : 'Dev')
  .build()
