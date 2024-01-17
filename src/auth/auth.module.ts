import { Module } from '@nestjs/common'
import { GoogleStrategy } from './auth.strategy'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UsersModule } from 'src/users/users.module'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JWT_EXPIRE } from 'src/config/jwt'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      signOptions: { expiresIn: JWT_EXPIRE },
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [GoogleStrategy, AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
