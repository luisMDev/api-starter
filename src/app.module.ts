import { Module } from '@nestjs/common';
import { ConfigModule as NestJsConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from './modules/config/config.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    NestJsConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    ConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
