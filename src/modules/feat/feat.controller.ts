import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { FeatUseCaseService } from './feat.service';

@Controller('users')
export class UsersController {
  constructor(private readonly featUsecase:FeatUseCaseService) {}

  @Get()
  // TODO: Auth guard from @dottedlabs/nestjs-auth-labs
  // TODO: Increment cost middleware
  public async getUsers(@Res() response: Response): Promise<void> {
    const result = this.featUsecase.featCall()
    
    response.json({ result });
  }


}
