import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common'
import { GuardianService } from './guardian.service'
import { CreateGuardianDto } from './dto/create-guardian.dto'
import { ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'

@ApiTags('Guardian')
@Controller('guardian')
export class GuardianController {
  constructor(private readonly guardianService: GuardianService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Req() req: any, @Body() createGuardianDto: CreateGuardianDto) {
    return await this.guardianService.create(req.user.id, createGuardianDto)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findOne(@Req() req: any) {
    return await this.guardianService.findOne(req.user.id)
  }
}
