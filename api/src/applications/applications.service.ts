import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ApplicationActivityService } from 'src/application-activity/application-activity.service';
import { CompetencyDomain } from 'src/models/competency.domain';
import { TechnologyDomain } from 'src/models/technology.domain';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ApplicationsService {
  constructor(
    private prisma: PrismaService,
    private activityService: ApplicationActivityService,
  ) {}

  async createApplication({ jobDescriptionId }: { jobDescriptionId: string }) {
    const application = await this.prisma.application.create({
      data: {
        jobDescriptionId,
      },
    });

    this.activityService.addActivity(application.id, new Date(), 'STARTED', '');

    return application;
  }

  updateApplication(
    id: string,
    technologyDomains: TechnologyDomain[],
    competencyDomains: CompetencyDomain[],
  ) {
    const technologyInputs: Prisma.TechnologyWhereUniqueInput[] =
      technologyDomains.map((technologyDomain) => {
        return {
          id: technologyDomain.id,
        } as Prisma.TechnologyWhereUniqueInput;
      });

    const competenciesInputs: Prisma.CompetencyWhereUniqueInput[] =
      competencyDomains.map((competencyDomain) => {
        return {
          id: competencyDomain.id,
        };
      });

    return this.prisma.application.update({
      where: {
        id,
      },
      data: {
        technologies: {
          connect: technologyInputs,
        },
        competencies: {
          connect: competenciesInputs,
        },
      },
      select: {
        technologies: true,
        competencies: true,
      },
    });
  }

  getAllApplications() {
    return this.prisma.application.findMany({
      include: {
        jobDescription: {
          include: {
            company: true,
            jobTitle: true,
          },
        },
      },
    });
  }

  getApplication(id: string) {
    if (!id) {
      return this.getLatestApplication();
    }

    return this.prisma.application.findUnique({
      where: {
        id,
      },
      include: {
        jobDescription: {
          include: {
            company: true,
            jobTitle: true,
          },
        },
        technologies: true,
        competencies: true,
      },
    });
  }

  getLatestApplication() {
    return this.prisma.application.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        jobDescription: {
          include: {
            company: true,
            jobTitle: true,
          },
        },
        technologies: true,
        competencies: true,
      },
    });
  }

  deleteApplicationById(id: string) {
    return this.prisma.application.delete({
      where: {
        id,
      },
    });
  }
}
