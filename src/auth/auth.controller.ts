import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthGuard } from '@nestjs/passport'
import { ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'

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
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    try {
      const access_token = await this.authService.googleSignIn(req)

      res.cookie('access_token', access_token, {
        maxAge: 2592000000,
        sameSite: true,
        secure: false,
      })

      res.status(HttpStatus.OK).redirect('/')
    } catch (err) {
      res.status(HttpStatus.UNAUTHORIZED).redirect('/?error=' + err.message)
    }
  }
}
