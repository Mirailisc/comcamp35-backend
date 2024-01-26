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
  app.enableCors({
    origin: [process.env.FRONTEND_URL, 'http://localhost:3000'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })

  await app.listen(port)
}
bootstrap()
