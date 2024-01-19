import { Controller, Get, UseGuards, Req } from '@nestjs/common'
import { UsersService } from './users.service'
import { ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('info')
  async getCurrentUser(@Req() req: any) {
    return await this.usersService.findOneByEmail(req.user.email)
  }
}
