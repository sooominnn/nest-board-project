import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import * as process from 'process';

@Injectable()
export class UploadService {
  private readonly s3;

  constructor() {
    this.s3 = new S3({
      region: process.env.AWS_S3_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    const key = `${Date.now() + file.originalname}`;
    const params: S3.Types.PutObjectRequest = {
      Bucket: process.env.AWS_S3_BUCKET,
      ACL: 'private',
      Key: key,
      Body: file.buffer,
    };

    return new Promise<string>((resolve, reject) => {
      this.s3.putObject(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          // 이미지 업로드 성공 시 해당 이미지의 URL을 반환
          const imageUrl = this.s3.getSignedUrl('getObject', {
            Bucket: process.env.AWS_S3_BUCKET,
            Key: key,
          });
          resolve(imageUrl);
        }
      });
    });
  }
}
