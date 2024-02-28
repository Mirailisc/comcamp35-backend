import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule } from '@nestjs/swagger'
import { config } from './config/swagger'
import * as cookieParser from 'cookie-parser'
import { PORT } from './config/constants'
import { apiReference } from '@scalar/nestjs-api-reference'
import { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  if (process.env.NODE_ENV !== 'production') {
    const document = SwaggerModule.createDocument(app, config)
    // SwaggerModule.setup('api', app, document)

    app.use(
      '/api',
      apiReference({
        spec: {
          content: document,
        },
      }),
    )
  }

  app.useBodyParser('json', { limit: '50mb' })
  app.useBodyParser('urlencoded', {
    limit: '50mb',
    extended: true,
  })
  app.use(cookieParser())
  app.enableCors({
    origin: [process.env.FRONTEND_URL, 'http://localhost:3000'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })

  await app.listen(PORT)
}
bootstrap()
