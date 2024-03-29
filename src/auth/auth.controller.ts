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
import { ACCESS_TOKEN_COOKIE_NAME, cookieConfig } from 'src/config/cookies'
import { IGoogleUser } from './google.type'
import * as dayjs from 'dayjs'
import { TOKEN_EXPIRE_DATE } from 'src/config/constants'

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
        ...cookieConfig,
        expires: dayjs().add(TOKEN_EXPIRE_DATE, 'days').toDate(),
      })

      res.status(HttpStatus.OK).redirect(process.env.FRONTEND_URL + '/register')
    } catch (err) {
      res.status(HttpStatus.UNAUTHORIZED).redirect('/?error=' + err.message)
    }
  }

  @Post('sign-out')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiCookieAuth(ACCESS_TOKEN_COOKIE_NAME)
  @UseGuards(AuthGuard('jwt'))
  @ApiNoContentResponse()
  @ApiUnauthorizedResponse()
  signOut(
    @Req() req: any,
    @Res({ passthrough: true }) res: Pick<Response, 'clearCookie'>,
  ) {
    this.authService.signOut(req.user.email, res)
  }
}
