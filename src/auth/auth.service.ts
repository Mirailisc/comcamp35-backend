import {
  Injectable,
  InternalServerErrorException,
  Logger,
  Res,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service'
import { IGoogleUser } from './google.type'
import { Response } from 'express'
import { ACCESS_TOKEN_COOKIE_NAME, cookieConfig } from 'src/config/cookies'

@Injectable()
export class AuthService {
  private logger: Logger = new Logger('Auth')

  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  generateJwt(payload: any) {
    return this.jwtService.sign(payload)
  }

  async googleSignIn(user: IGoogleUser) {
    const userExists = await this.userService.findOneByEmail(user.email)
    this.logger.log(`${user.email} signed in`)

    if (!userExists) {
      return this.registerUser(user)
    }

    return this.generateJwt({
      sub: userExists.id,
      email: userExists.email,
    })
  }

  async registerUser(user: IGoogleUser) {
    try {
      const newUser = await this.userService.create({
        email: user.email,
        first_name: user.firstName,
        last_name: user.lastName,
        profile_url: user.picture,
      })

      return this.generateJwt({
        sub: newUser.id,
        email: newUser.email,
      })
    } catch {
      throw new InternalServerErrorException()
    }
  }

  signOut(
    email: string,
    @Res({ passthrough: true }) res: Pick<Response, 'clearCookie'>,
  ) {
    this.logger.log(`${email} signed out`)
    res.clearCookie(ACCESS_TOKEN_COOKIE_NAME, { ...cookieConfig, maxAge: -1 })
  }
}
