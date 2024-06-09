import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'alice@cool.org' })
  @IsString()
  email: string;

  @ApiProperty({ example: 'alice' })
  @IsString()
  password: string;
}
