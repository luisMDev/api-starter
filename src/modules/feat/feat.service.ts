import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';

@Injectable()
export class FeatUseCaseService {
  constructor(
    private prisma: PrismaService,
  ) {}

  public featCall() {
    return 'Hello World'
  }
}

