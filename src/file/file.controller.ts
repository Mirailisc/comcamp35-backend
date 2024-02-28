import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  ParseFilePipe,
  MaxFileSizeValidator,
} from '@nestjs/common'
import { FileService } from './file.service'
import { ApiConsumes, ApiTags } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import { AuthGuard } from '@nestjs/passport'
import { UploadFileDto } from './dto/upload-file.dto'
import { MAX_UPLOAD_BYTES } from 'src/config/constants'

@ApiTags('File Upload')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard('jwt'))
  async uploadFile(
    @Body() uploadFileDto: UploadFileDto,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: MAX_UPLOAD_BYTES })],
      }),
    )
    file: Express.Multer.File,
    @Req() req: any,
  ) {
    await this.fileService.uploadFile(file, req.user.id, uploadFileDto.type)
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getFilesUrl(@Req() req: any) {
    return await this.fileService.getFileUrlByUserId(req.user.id)
  }
}
