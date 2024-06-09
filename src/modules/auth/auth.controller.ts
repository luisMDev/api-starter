import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { um_User } from '@prisma/client';
import { Request as ExpressRequest, Request, Response } from 'express';
import { JwtAuthGuard } from '../../common/guards/jwt.auth-guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  public me(@Req() req: ExpressRequest & { user: um_User }): um_User {
    return req.user;
  }

  @Get('reload-token')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  public async reloadToken(@Res() response: Response, @Req() req: ExpressRequest & { user: um_User }): Promise<void> {
    const ret: string = await this.authService.reloadtoken(req.user.id);
    console.log('ret', ret);

    response.json(ret);
  }

  @Post('login')
  public async login(@Res() response: Response, @Body() body: LoginDto): Promise<void> {
    const ret: string = await this.authService.login(body);

    response.json(ret);
  }

  @Get('login-google')
  @UseGuards(AuthGuard('google'))
  public async loginGoogle() {}

  @Get('login-google-redirect')
  @UseGuards(AuthGuard('google'))
  public async loginGoogleRedirect(@Req() req: Request, @Res() response: Response) {
    // Prevents the user from logging in if the provider is disabled
    const token: string = await this.authService.loginSocial(req);

    response.cookie('user_token', token);
    response.redirect(`http://localhost:4200/auth/login`);
  }

  @Get('login-github')
  @UseGuards(AuthGuard('github'))
  public async loginGithub() {}

  @Get('login-github-redirect')
  @UseGuards(AuthGuard('github'))
  public async loginGithubRedirect(@Req() req: Request, @Res() response: Response) {
    // Prevents the user from logging in if the provider is disabled
    const token: string = await this.authService.loginSocial(req);

    response.cookie('user_token', token);
    response.redirect(`http://localhost:4200/auth/login`);
  }

  @Get('login-twitter')
  @UseGuards(AuthGuard('twitter'))
  public async loginTwitter() {}

  @Get('login-twitter-redirect')
  @UseGuards(AuthGuard('twitter'))
  public async loginTwitterRedirect(@Req() req: Request, @Res() response: Response) {
    // Prevents the user from logging in if the provider is disabled
    const token: string = await this.authService.loginSocial(req);

    response.cookie('user_token', token);
    response.redirect(`http://localhost:4200/auth/login`);
  }

  @Get('login-facebook')
  @UseGuards(AuthGuard('facebook'))
  public async loginFacebook(@Req() req: Request, @Res() response: Response) {
    // Prevents the user from logging in if the provider is disabled
    const token: string = await this.authService.loginSocial(req);

    response.cookie('user_token', token);
    response.redirect(`http://localhost:4200/auth/login`);
  }

  @Get('login-facebook-redirect')
  @UseGuards(AuthGuard('facebook'))
  public async loginFacebookRedirect(@Req() req: Request, @Res() response: Response) {
    const token: string = await this.authService.loginSocial(req);

    response.cookie('user_token', token);
    response.redirect(`http://localhost:4200/auth/login`);
  }

  @Get('login-discord')
  @UseGuards(AuthGuard('discord'))
  public async loginDiscord(@Req() req: Request, @Res() response: Response) {
    // Prevents the user from logging in if the provider is disabled
    const token: string = await this.authService.loginSocial(req);

    response.cookie('user_token', token);
    response.redirect(`http://localhost:4200/auth/login`);
  }

  @Get('login-discord-redirect')
  @UseGuards(AuthGuard('discord'))
  public async loginDiscordRedirect(@Req() req: Request, @Res() response: Response) {
    const token: string = await this.authService.loginSocial(req);

    response.cookie('user_token', token);
    response.redirect(`http://localhost:4200/auth/login`);
  }

  @Get('login-apple')
  @UseGuards(AuthGuard('apple'))
  public async loginApple(@Req() req: Request, @Res() response: Response) {
    // Prevents the user from logging in if the provider is disabled
    const token: string = await this.authService.loginSocial(req);

    response.cookie('user_token', token);
    response.redirect(`http://localhost:4200/auth/login`);
  }

  @Get('login-apple-redirect')
  @UseGuards(AuthGuard('apple'))
  public async loginAppleRedirect(@Req() req: Request, @Res() response: Response) {
    const token: string = await this.authService.loginSocial(req);

    response.cookie('user_token', token);
    response.redirect(`http://localhost:4200/auth/login`);
  }
}
