import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { um_User } from '@prisma/client';
import { Strategy } from 'passport-local';
import { AuthService } from '../../modules/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: string, password: string): Promise<um_User> {
    const user = await this.authService.validate(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
