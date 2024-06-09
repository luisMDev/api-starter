import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../../common/strategies/jwt.strategy';
import { LocalStrategy } from '../../common/strategies/local.strategy';
import { PrismaModule } from '../../core/prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from '../../common/strategies/google.strategy';
import { UsersService } from '../users/users.service';
import { GithubStrategy } from '../../common/strategies/github.strategy';
import { S3Service } from '../../core/services/s3.service';
import { GStorageService } from '../../core/services/gstorage.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60000s' },
    }),
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, LocalStrategy, JwtStrategy, GoogleStrategy, GithubStrategy, S3Service, GStorageService],
  exports: [AuthService, LocalStrategy, JwtStrategy, GoogleStrategy, S3Service, GStorageService],
})
export class AuthModule {}
