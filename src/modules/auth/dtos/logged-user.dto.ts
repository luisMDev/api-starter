import { ApiProperty } from '@nestjs/swagger';

export class LoggedUserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  access_token: string;
}
