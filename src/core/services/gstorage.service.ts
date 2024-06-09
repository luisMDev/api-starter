import { Bucket, Storage } from '@google-cloud/storage';
import { BadRequestException, Injectable } from '@nestjs/common';
import { parse } from 'path';

@Injectable()
export class GStorageService {
  private bucket: Bucket;
  private storage: Storage;

  constructor() {
    this.storage = new Storage({
      projectId: process.env.GCLOUD_PROJECT_ID,
      credentials: {
        client_email: process.env.GCLOUD_CLIENT_EMAIL,
        private_key: process.env.GCLOUD_PRIVATE_KEY,
      },
    });
    this.bucket = this.storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);
  }

  private setDestination(destination: string): string {
    let escDestination = '';
    escDestination += destination.replace(/^\.+/g, '').replace(/^\/+|\/+$/g, '');
    if (escDestination !== '') escDestination = escDestination + '/';
    return escDestination;
  }

  private setFilename(uploadedFile: Express.Multer.File): string {
    const fileName = parse(uploadedFile.originalname);
    return `${fileName.name}-${Date.now()}${fileName.ext}`.replace(/^\.+/g, '').replace(/^\/+/g, '').replace(/\r|\n/g, '_');
  }

  async uploadFile(uploadedFile: Express.Multer.File, destination: string): Promise<string> {
    const fileName = this.setDestination(destination) + this.setFilename(uploadedFile);
    const file = this.bucket.file(fileName);
    // try {
    await file.save(uploadedFile.buffer, { contentType: uploadedFile.mimetype });
    // } catch (error) {
    //   throw new BadRequestException(error?.message);
    // }
    return `https://storage.googleapis.com/${this.bucket.name}/${file.name}`;
  }

  async removeFile(fileName: string): Promise<void> {
    const file = this.bucket.file(fileName);
    try {
      await file.delete();
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }
}
