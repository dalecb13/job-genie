import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CompetenciesService {
  constructor(private prisma: PrismaService) {}

  getAllCompetencies() {
    return this.prisma.competency.findMany();
  }

  getCompetencyById(id: string) {
    return this.prisma.competency.findUnique({ where: { id } });
  }

  createCompetency(name: string) {
    return this.prisma.competency.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
}
