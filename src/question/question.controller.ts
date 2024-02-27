import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common'
import { QuestionService } from './question.service'
import { AuthGuard } from '@nestjs/passport'
import { AnswerDto } from './dto/answer.dto'

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createOrUpdate(@Req() req: any, @Body() answerDto: AnswerDto) {
    return await this.questionService.create(req.user.id, answerDto)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Req() req: any) {
    return await this.questionService.findOne(req.user.id)
  }
}
