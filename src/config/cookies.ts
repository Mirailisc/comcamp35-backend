import { CookieOptions } from 'express'

export const ACCESS_TOKEN_COOKIE_NAME = 'access_token'

export const cookieConfig: CookieOptions = {
  sameSite: 'none',
  secure: true,
  httpOnly: true,
  domain: 'kronos.moe',
}
