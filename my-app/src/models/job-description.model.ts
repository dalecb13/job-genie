import type { Company } from "./company.model";
import type { JobTitle } from "./job-title.model";
import type { WorkType } from "./work-type.enum";

export type JobDescription = {
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
}

export type CreateJobDescriptionDto = {
  link: string;
  rawText: string;
  companyId: string;
  jobTitleId: string;
  workType: WorkType;
  location: string;
}
