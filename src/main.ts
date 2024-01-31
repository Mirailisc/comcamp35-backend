import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule } from '@nestjs/swagger'
import { config } from './config/swagger'
import * as cookieParser from 'cookie-parser'
import { PORT } from './config/constants'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // if (process.env.NODE_ENV !== 'production') {
  //   const document = SwaggerModule.createDocument(app, config)
  //   SwaggerModule.setup('api', app, document)
  // }

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  app.use(cookieParser())
  app.enableCors({
    origin: [process.env.FRONTEND_URL, 'http://localhost:3000'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })

  await app.listen(PORT)
}
bootstrap()
