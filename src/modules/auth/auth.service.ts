import { HttpException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { um_User } from '@prisma/client';
import { compare } from 'bcrypt';
import { PrismaService } from './../../core/prisma/prisma.service';
import { UsersService } from './../users/users.service';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
    private usersService: UsersService,
  ) {}

  public async validate(email: string, password: string): Promise<um_User> {
    const user = await this.prismaService.um_User.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      return null;
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  public async reloadtoken(id: string): Promise<string> {
    try {
      const user: um_User = await this.usersService.find(id);

      return this.jwtService.signAsync(user);
    } catch (error) {
      throw new HttpException(error, error.status);
    }
  }

  public async login(loginUserDto: LoginDto): Promise<string> {
    try {
      // find user by email
      const user: um_User = await this.usersService.findByEmail(loginUserDto.email);

      console.log('user', user);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      // check if password is correct by comparing it with the hashed password in the database
      if (!loginUserDto.password || !user.password || !(await compare(loginUserDto.password, user.password))) {
        throw new UnauthorizedException('Invalid credentials');
      }

      delete user.password;

      // const payload: JwtPayloadDto = user;

      return this.jwtService.signAsync(user);
    } catch (error) {
      // throw error if any
      // throw new HttpException(error, 500);
      throw new HttpException(error, error.status);
    }
  }

  public async loginSocial(req): Promise<string> {
    if (!req.user) {
      throw new NotFoundException('Social user not found');
    }

    let user: um_User;

    try {
      user = await this.usersService.findByEmail(req.user.email);
    } catch (error) {
      // create user if not found
      user = await this.createUserFromSocialLogin(req.user.email, req.user.name, req.user.avatar);
    }

    return this.jwtService.signAsync(user);
  }

  private async createUserFromSocialLogin(email: string, name: string, avatar: string): Promise<um_User> {
    return this.usersService.create(email, name, avatar);
  }
}
