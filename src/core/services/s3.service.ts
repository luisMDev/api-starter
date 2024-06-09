import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class S3Service {
  public s3Instance;

  constructor() {
    this.s3Instance = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }
  public async uploadFile(file: Express.Multer.File, path: string): Promise<string> {
    console.log(file);
    const { originalname, buffer, mimetype } = file;
    const extension = this.extractExtension(originalname);
    const filename = `${path}/${uuidv4()}.${extension}`;
    const bucket: string = process.env.AWS_S3_BUCKET;

    return await this.s3_upload(buffer, bucket, filename, mimetype);
  }

  private extractExtension(filename: string) {
    return filename.split('.').pop();
  }

  private async s3_upload(Body: Buffer, Bucket: string, Key: string, ContentType: string): Promise<string> {
    const params = {
      Bucket,
      Key,
      Body,
      ContentType,
      ACL: 'public-read',
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-south-1',
      },
    };

    try {
      const { Location } = await this.s3Instance.upload(params).promise();
      return Location;
    } catch (e) {
      console.log(e);
    }
  }
}
