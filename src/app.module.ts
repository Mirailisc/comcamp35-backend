import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users/users.module'
import { FileModule } from './file/file.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UsersModule, FileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
