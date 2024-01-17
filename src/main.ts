import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { port } from './config/constants'
import { SwaggerModule } from '@nestjs/swagger'
import { config } from './config/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(port)
}
bootstrap()
