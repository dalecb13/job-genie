import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CompanyModule } from './company/company.module';
import { PrismaModule } from './prisma/prisma.module';
import { JobTitleModule } from './job-title/job-title.module';
import { JobDescriptionModule } from './job-description/job-description.module';
import { ApplicationsModule } from './applications/applications.module';
import { TechnologiesModule } from './technologies/technologies.module';
import { CompetenciesModule } from './competencies/competencies.module';
import { AchievementsModule } from './achievements/achievements.module';
import { WorkExperiencesModule } from './work-experiences/work-experiences.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CompanyModule,
    PrismaModule,
    JobTitleModule,
    JobDescriptionModule,
    ApplicationsModule,
    TechnologiesModule,
    CompetenciesModule,
    AchievementsModule,
    WorkExperiencesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
