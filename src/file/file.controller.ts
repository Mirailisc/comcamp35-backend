import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common'
import { FileService } from './file.service'
import { ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { UploadFileDto } from './dto/upload-file.dto'

@ApiTags('File Upload')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseGuards(AuthGuard('jwt'))
  async uploadFile(@Body() uploadFileDto: UploadFileDto, @Req() req: any) {
    await this.fileService.uploadFile(req.user.id, uploadFileDto)
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getFilesUrl(@Req() req: any) {
    return await this.fileService.getFileUrlByUserId(req.user.id)
  }
}
