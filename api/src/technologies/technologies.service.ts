import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TechnologiesService {
  constructor(private prisma: PrismaService) {}

  getAllTechnologies() {
    return this.prisma.technology.findMany();
  }

  createTechnologies(technologies: string[]) {
    return this.prisma.technology.createMany({
      data: technologies.map((technology) => ({ name: technology })),
    });
  }

  createTechnology(name: string) {
    return this.prisma.technology.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
}
