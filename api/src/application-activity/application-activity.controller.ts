import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApplicationActivityService } from './application-activity.service';

@Controller('application-activity')
export class ApplicationActivityController {
  constructor(
    private readonly applicationActivityService: ApplicationActivityService,
  ) {}

  @Get()
  findAll() {
    return this.applicationActivityService.getAllActivities();
  }

  @Post()
  addActivity(
    @Body()
    body: {
      applicationId: string;
      activityDate: Date;
      activityType: string;
      activityDetails: string;
    },
  ) {
    return this.applicationActivityService.addActivity(
      body.applicationId,
      body.activityDate,
      body.activityType,
      body.activityDetails,
    );
  }
}
