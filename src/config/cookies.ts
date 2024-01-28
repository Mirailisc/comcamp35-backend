import { CookieOptions } from 'express'

export const ACCESS_TOKEN_COOKIE_NAME = 'access_token'

export const cookieConfig: CookieOptions = {
  sameSite: 'none',
  secure: true,
  httpOnly: true,
  domain: process.env.NODE_ENV === 'production' ? 'kronos.moe' : 'localhost',
}
