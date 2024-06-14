import { ArcModule } from '@arcane-auth/nest-client';
import { Module } from '@nestjs/common';
import { DemoController } from './demo.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ArcModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          authUrl: configService.get<string>('ARC_AUTH_URL'),
          clientId: configService.get<string>('ARC_CLIENT_ID'),
          clientSecret: configService.get<string>('ARC_CLIENT_SECRET'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [DemoController],
  providers: [],
})
export class DemoModule {}
