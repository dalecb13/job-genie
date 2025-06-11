import type { Company } from "./company.model";
import type { Competency } from "./competency.model";
import type { JobDescription } from "./job-description.model";
import type { Profile } from "./profile.model";
import type { Technology } from "./technology.model";

export type Application = {
  id: string;
  createdAt: string;
  updatedAt: string;
  jobDescriptionId: string;
  jobDescription: JobDescription;
  companyId: string;
  company: Company;
  ownerId: string;
  Owner?: Profile;
  technologies: Technology[];
  competencies: Competency[];
  activity?: string[];
  status?: string;
  latestActivityDate?: string;
}

export type CreateApplicationDto = {
  jobDescriptionId: string;
  // companyId: string;
  // ownerId: string;
}
