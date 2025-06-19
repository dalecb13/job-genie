import type { Company } from "./company.model";
import type { Competency, CompetencyModel } from "./competency.model";
import type { JobTitle } from "./job-title.model";
import type { Technology, TechnologyModel } from "./technology.model";
import type { WorkType } from "./work-type.enum";

export type JobDescriptionModel = {
  id: string;
  createdAt: string;
  updatedAt: string;
  link: string;
  rawText: string;
  companyId: string
  company: Company;
  jobTitleId: string;
  jobTitle: JobTitle;
  workType: WorkType;
  location?: string;
  technologies: TechnologyModel[];
  competencies: CompetencyModel[];
}

export type JobDescription = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  link: string;
  rawText: string;
  companyId: string
  company: Company;
  jobTitleId: string;
  jobTitle: JobTitle;
  workType: WorkType;
  location?: string;
  technologies: Technology[];
  competencies: Competency[];
}

export type CreateJobDescriptionDto = {
  link: string;
  rawText: string;
  companyId: string;
  jobTitleId: string;
  workType: WorkType;
  location: string;
}
