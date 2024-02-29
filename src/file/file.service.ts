import { Injectable, Logger } from '@nestjs/common'
import { File, File as PrismaFile } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { UploadFileDto } from './dto/upload-file.dto'

@Injectable()
export class FileService {
  private logger: Logger = new Logger('S3')

  constructor(private prisma: PrismaService) {}

  async uploadFile(id: number, uploadFileDto: UploadFileDto) {
    const existFile = await this.getFileUrlByUserId(id)

    // get exist file based on uploadFileDto.type
    // if not exist, create new file
    // if exist, update file

    this.logger.log(`User ${id} uploading file`)

    const getFileByType = existFile.find(
      (file: File) => file.type === uploadFileDto.type,
    )

    if (getFileByType) {
      const res = await this.prisma.file.update({
        where: { id: getFileByType.id, userId: id, type: uploadFileDto.type },
        data: {
          ...uploadFileDto,
          userId: id,
        },
      })

      this.logger.log(`User ${id} updated ${res.type} file`)
      return res.url
    } else {
      const res = await this.prisma.file.create({
        data: {
          ...uploadFileDto,
          userId: id,
        },
      })

      this.logger.log(`User ${id} uploaded file to ${res.url}`)
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
