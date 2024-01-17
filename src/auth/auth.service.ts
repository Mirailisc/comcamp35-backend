import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service'

interface IGoogleUser {
  email: string
  firstName: string
  lastName: string
  picture: any
  accessToken: string
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  generateJwt(payload) {
    return this.jwtService.sign(payload)
  }

  async googleSignIn(req: any) {
    const user = req.user as IGoogleUser

    const userExists = await this.userService.findOneByEmail(user.email)

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

  // async validateToken(req: Request) {
  //   const authorization = req.get('authorization')

  //   if (!authorization) {
  //     throw new UnauthorizedException()
  //   }

  //   const userTempId = authorization.replace('Bearer', '')
  //   if (!uuidValidate(userTempId)) {
  //     throw new UnauthorizedException()
  //   }

  //   return googleUser
  // }
}
