import { Controller, Get, Body, Patch, UseGuards, Req } from '@nestjs/common'
import { UsersService } from './users.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() {
    return await this.usersService.findAll()
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(@Req() req: any, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(req.user.id, updateUserDto)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('info')
  async getCurrentUser(@Req() req: any) {
    return await this.usersService.findOneByEmail(req.user.email)
  }
}
