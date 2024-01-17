import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { port } from './config/constants'
import { SwaggerModule } from '@nestjs/swagger'
import { config } from './config/swagger'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  app.use(cookieParser())
  await app.listen(port)
}
bootstrap()
