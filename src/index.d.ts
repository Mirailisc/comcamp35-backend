declare global {
  namespace Express {
    interface User {
      email: string
      firstName: string
      lastName: string
      picture: any
      accessToken: string
    }
  }
}
