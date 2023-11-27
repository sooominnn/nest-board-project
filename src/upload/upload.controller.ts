import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller()
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Post('/upload')
  @UseInterceptors(FilesInterceptor('files', 10))
  async uploadFile(@UploadedFiles() files: Express.Multer.File[]) {
    console.log(files);
    const imgUrl: string[] = [];

    await Promise.all(
      files.map(async (file) => {
        const uploadedUrl = await this.uploadService.uploadImage(file);
        if (typeof uploadedUrl === 'string') {
          imgUrl.push(uploadedUrl);
        }
      }),
    );

    return {
      statusCode: 201,
      message: '이미지 등록 성공',
      data: imgUrl,
    };
  }
}
