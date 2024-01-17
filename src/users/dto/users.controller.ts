import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpStatus,
  UseGuards,
} from '@nestjs/common'
import { UsersService } from '../users.service'
import { CreateUserDto } from './create-user.dto'
import { UpdateUserDto } from './update-user.dto'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Email is already exists',
  })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'OK' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() {
    return await this.usersService.findAll()
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOneById(@Param('id') id: number) {
    return await this.usersService.findOneById(id)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':email')
  async findOneByEmail(@Param('email') email: string) {
    return await this.usersService.findOneByEmail(email)
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(+id, updateUserDto)
  }
}
