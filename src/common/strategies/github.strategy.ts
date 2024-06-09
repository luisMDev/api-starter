import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:2000/auth/login-github-redirect',
      scope: ['user:email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile): Promise<any> {
    console.log(profile);

    const user = {
      email: profile.emails[0].value,
      name: profile.username,
      avatar: profile.photos[0].value,
      accessToken,
    };
    return user;
  }
}
