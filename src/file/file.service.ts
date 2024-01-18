import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { File } from '@prisma/client'
import * as Minio from 'minio'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class FileService {
  private logger: Logger = new Logger('S3')

  private minioClient: Minio.Client

  private bucketName: string

  constructor(private prisma: PrismaService) {
    this.minioClient = new Minio.Client({
      endPoint: process.env.MINIO_ENDPOINT,
      port: 443,
      useSSL: true,
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
    })

    this.bucketName = process.env.MINIO_BUCKET_NAME
  }

  async createBucketIfNotExists() {
    const bucketExists = await this.minioClient.bucketExists(this.bucketName)
    if (!bucketExists) {
      await this.minioClient.makeBucket(this.bucketName)
    }
  }

  async uploadFile(file: Express.Multer.File, userId: number, type: string) {
    if (!file) {
      throw new NotFoundException('File not found')
    }

    const fileName = `${userId}${Date.now()}-${file.originalname}`

    await this.minioClient.putObject(
      this.bucketName,
      fileName,
      file.buffer,
      file.size,
    )

    const fileUrl = await this.getFileUrl(fileName)

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        files: {
          create: [
            {
              url: fileUrl,
              type,
            },
          ],
        },
      },
    })

    this.logger.log(`File ${file.originalname} uploaded`)
    return fileName
  }

  async getFileUrlByUserId(id: number): Promise<File[]> {
    const files = await this.prisma.file.findMany({
      where: { userId: id },
    })

    return files
  }

  async getFileUrl(fileName: string) {
    return `http://${process.env.MINIO_ENDPOINT}/${process.env.MINIO_BUCKET_NAME}/${fileName}`
  }

  async deleteFile(fileName: string) {
    await this.minioClient.removeObject(this.bucketName, fileName)
  }
}
