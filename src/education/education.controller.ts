import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common'
import { EducationService } from './education.service'
import { CreateEducationDto } from './dto/create-education.dto'
import { AuthGuard } from '@nestjs/passport'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Education')
@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Req() req: any,
    @Body() createEducationDto: CreateEducationDto,
  ) {
    return await this.educationService.create(req.user.id, createEducationDto)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findOne(@Req() req: any) {
    return await this.educationService.findOne(req.user.id)
  }
}
