import { Injectable, Logger } from '@nestjs/common'
import { File as PrismaFile } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class FileService {
  private logger: Logger = new Logger('S3')

  constructor(private prisma: PrismaService) {}

  async uploadFile(url: string, userId: number, type: string) {
    // if (!file) {
    //   throw new NotFoundException('File not found')
    // }

    // const fileName = `${userId}${Date.now()}-${file.originalname}`

    // const newFile = new File([Buffer.from(file.buffer)], file.originalname)

    // const { url } = await upload(newFile, {
    //   headers: { Random: 'comcamp35', CustomHeader: 'nanahoshi' },
    // })

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        files: {
          create: [
            {
              url,
              type,
            },
          ],
        },
      },
    })

    this.logger.log(`User ${userId} uploaded file to ${url}`)
    return url
  }

  async getFileUrlByUserId(id: number): Promise<PrismaFile[]> {
    const files = await this.prisma.file.findMany({
      where: { userId: id },
    })

    return files
  }
}
