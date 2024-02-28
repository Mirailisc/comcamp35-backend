import { Injectable, Logger } from '@nestjs/common'
import { File as PrismaFile } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { UploadFileDto } from './dto/upload-file.dto'

@Injectable()
export class FileService {
  private logger: Logger = new Logger('S3')

  constructor(private prisma: PrismaService) {}

  async uploadFile(id: number, uploadFileDto: UploadFileDto) {
    const res = await this.prisma.file.upsert({
      where: { userId: id },
      create: { ...uploadFileDto, userId: id },
      update: {
        ...uploadFileDto,
        userId: id,
      },
    })

    this.logger.log(`User ${id} uploaded file to ${res.url}`)
    return res.url
  }

  async getFileUrlByUserId(id: number): Promise<PrismaFile[]> {
    const files = await this.prisma.file.findMany({
      where: { userId: id },
    })

    return files
  }
}
