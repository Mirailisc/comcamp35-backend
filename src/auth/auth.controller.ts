import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthGuard } from '@nestjs/passport'
import {
  ApiCookieAuth,
  ApiNoContentResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { Request, Response } from 'express'
import { ACCESS_TOKEN_COOKIE_NAME } from 'src/config/cookies'
import { IGoogleUser } from './google.type'
import dayjs from 'dayjs'

const TOKEN_EXPIRE_DATE = 30

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @HttpCode(HttpStatus.TEMPORARY_REDIRECT)
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @HttpCode(HttpStatus.TEMPORARY_REDIRECT)
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(
    @Req() req: Pick<Request, 'user'>,
    @Res({ passthrough: true })
    res: Pick<Response, 'cookie' | 'status' | 'redirect'>,
  ) {
    try {
      const access_token = await this.authService.googleSignIn(
        req.user as IGoogleUser,
      )

      res.cookie(ACCESS_TOKEN_COOKIE_NAME, access_token, {
        expires: dayjs().add(TOKEN_EXPIRE_DATE, 'days').toDate(),
        sameSite: 'none',
        secure: true,
        httpOnly: true,
      })

      res.status(HttpStatus.OK).redirect(process.env.FRONTEND_URL + '/register')
    } catch (err) {
      res.status(HttpStatus.UNAUTHORIZED).redirect('/?error=' + err.message)
    }
  }

  @Post('sign-out')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiCookieAuth(ACCESS_TOKEN_COOKIE_NAME)
  @ApiNoContentResponse()
  @ApiUnauthorizedResponse()
  signOut(
    @Res({ passthrough: true }) res: Pick<Response, 'clearCookie' | 'status'>,
  ) {
    res.clearCookie(ACCESS_TOKEN_COOKIE_NAME)
  }
}
