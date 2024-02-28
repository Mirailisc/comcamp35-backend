import { Injectable, Logger } from '@nestjs/common'
import { File as PrismaFile } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { UploadFileDto } from './dto/upload-file.dto'

const MIN_FILE = 5
@Injectable()
export class FileService {
  private logger: Logger = new Logger('S3')

  constructor(private prisma: PrismaService) {}

  async uploadFile(id: number, uploadFileDto: UploadFileDto) {
    const existFile = await this.getFileUrlByUserId(id)

    if (
      uploadFileDto.type === 'academic-answer' ||
      existFile.length <= MIN_FILE
    ) {
      const res = await this.prisma.file.create({
        data: {
          ...uploadFileDto,
          userId: id,
        },
      })

      this.logger.log(`User ${id} uploaded file to ${res.url}`)
      return res.url
    } else {
      const existFile = await this.prisma.file.findFirst({
        where: { userId: id, type: uploadFileDto.type },
      })

      const res = await this.prisma.file.update({
        where: { id: existFile.id, userId: id, type: uploadFileDto.type },
        data: {
          ...uploadFileDto,
          userId: id,
        },
      })

      this.logger.log(`User ${id} updated ${res.type} file`)
      return res.url
    }
  }

  async getFileUrlByUserId(id: number): Promise<PrismaFile[]> {
    const files = await this.prisma.file.findMany({
      where: { userId: id },
    })

    return files
  }
}
