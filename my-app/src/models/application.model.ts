import type { Activity, ActivityModel } from "./activity.model";
import type { Company, CompanyModel } from "./company.model";
import type { JobDescription, JobDescriptionModel } from "./job-description.model";
import type { Profile } from "./profile.model";

export type ApplicationModel = {
  id: string;
  createdAt: string;
  updatedAt: string;
  jobDescriptionId: string;
  jobDescription: JobDescriptionModel;
  companyId: string;
  company: CompanyModel;
  ownerId: string;
  Owner?: Profile;
  activities: ActivityModel[];
  status?: string;
  latestActivityDate?: string;
}

export type CreateApplicationDto = {
  jobDescriptionId: string;
}

export type Application = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  jobDescriptionId: string;
  jobDescription: JobDescription;
  companyId: string;
  company: Company;
  ownerId: string;
  Owner?: Profile;
  activities: Activity[];
  status?: string;
  latestActivityDate?: Date;
}
