import { ArcPermissions, ArcRoles, ArcTrackMetric } from '@arcane-auth/nest-client';
import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('demo')
export class DemoController {
  constructor() {}

  @Get('role-guard-test')
  @ArcRoles(['Admin'])
  public async roleGuardTest(@Res() response: Response): Promise<void> {
    response.json({ message: 'OK' });
  }

  @Get('permission-guard-test')
  @ArcPermissions(['root:users:create'])
  public async permissionGuardTest(@Res() response: Response): Promise<void> {
    response.json({ message: 'OK' });
  }

  @Get('track-metric-test')
  @ArcTrackMetric('callbacks')
  public async trackEventTest(@Res() response: Response): Promise<void> {
    response.json({ message: 'OK' });
  }
}
