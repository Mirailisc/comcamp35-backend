import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users/users.module'
import { FileModule } from './file/file.module'
import { AuthModule } from './auth/auth.module'
import { FormModule } from './form/form.module'
import { GuardianModule } from './guardian/guardian.module'
import { EducationModule } from './education/education.module'
import { QuestionModule } from './question/question.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    FileModule,
    AuthModule,
    FormModule,
    GuardianModule,
    EducationModule,
    QuestionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
