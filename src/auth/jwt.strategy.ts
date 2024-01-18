import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { ACCESS_TOKEN_COOKIE_NAME } from 'src/config/cookies'

export type JwtPayload = {
  sub: string
  email: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userService: UsersService) {
    const extractJwtFromCookie = (req) => {
      let token = null
      if (req && req.cookies) {
        token = req.cookies[ACCESS_TOKEN_COOKIE_NAME]
      }
      return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req)
    }

    super({
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: extractJwtFromCookie,
    })
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.findOneById(+payload.sub)

    if (!user) {
      throw new UnauthorizedException('Please log in to continue')
    }

    return {
      id: payload.sub,
      email: payload.email,
    }
  }
}
