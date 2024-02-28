import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common'
import { FormService } from './form.service'
import { CreateFormDto } from './dto/create-form.dto'
import { AuthGuard } from '@nestjs/passport'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Form')
@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createOrUpdate(@Req() req: any, @Body() createFormDto: CreateFormDto) {
    return await this.formService.createOrUpdate(req.user.id, createFormDto)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findOne(@Req() req: any) {
    return await this.formService.findOne(req.user.id)
  }
}
